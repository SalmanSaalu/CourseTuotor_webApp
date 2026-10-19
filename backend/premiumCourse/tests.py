from django.test import TestCase
from datetime import date
from django.contrib.auth.models import User
from unittest.mock import patch

from razorpay.errors import SignatureVerificationError
from rest_framework.test import APIClient
from courses.models import AllCourses
from .models import ClassEnroll, Order, PremiumCourseType, PremiumCourses
from .serializers import PremiumRegisterCourseSerializer


class PremiumCourseTypeSeparationTests(TestCase):
    def test_premium_type_and_course_image_are_independent(self):
        normal_type = AllCourses.objects.create(courseTypeName='Biology')
        premium_type = PremiumCourseType.objects.create(
            courseTypeName='Biology',
        )
        teacher = User.objects.create_user(username='teacher')
        course = PremiumCourses.objects.create(
            username=teacher,
            email='teacher@example.com',
            phone='1234567890',
            adhaar='123456789012',
            dob=date(1990, 1, 1),
            about='',
            linkedin='',
            qualification='',
            coursename='Advanced biology',
            coursedays='monday',
            coursetime='10:00',
            coursetype=premium_type,
            experience=1,
            amount=100,
            courseImage='premiumCoursePics/advanced-biology.jpg',
        )

        course_data = PremiumRegisterCourseSerializer(course).data

        self.assertIsInstance(normal_type, AllCourses)
        self.assertIsInstance(course.coursetype, PremiumCourseType)
        self.assertEqual(course_data['coursetypename'], 'Biology')
        self.assertTrue(
            course_data['courseimage'].endswith('advanced-biology.jpg')
        )


class PremiumCoursePaymentTests(TestCase):
    def setUp(self):
        self.owner = User.objects.create_user(username='course-owner')
        self.student = User.objects.create_user(username='course-student')
        course_type = PremiumCourseType.objects.create(
            courseTypeName='Biology',
        )
        self.course = PremiumCourses.objects.create(
            username=self.owner,
            email='owner@example.com',
            phone='1234567890',
            adhaar='123456789012',
            dob=date(1990, 1, 1),
            about='',
            linkedin='',
            qualification='',
            coursename='Advanced biology',
            coursedays='monday',
            coursetime='10:00',
            coursetype=course_type,
            experience=1,
            amount=375,
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.student)

    @patch('premiumCourse.views.razorpay.Client')
    def test_payment_order_uses_course_amount_and_does_not_enroll(self, client_class):
        client_class.return_value.order.create.return_value = {
            'id': 'order_test_123',
            'amount': 37500,
            'currency': 'INR',
        }

        response = self.client.post(
            '/razorpay/premiumClassEnroll/',
            {'course': self.course.pk},
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['order']['amount'], 37500)
        order = Order.objects.get(order_payment_id='order_test_123')
        self.assertEqual(order.ordered_by, self.student)
        self.assertEqual(order.premium_course, self.course)
        self.assertEqual(order.order_amount, '375')
        self.assertFalse(ClassEnroll.objects.exists())

    @patch('premiumCourse.views.razorpay.Client')
    def test_verified_captured_payment_creates_enrollment(self, client_class):
        order = Order.objects.create(
            ordered_by=self.student,
            order_amount='375',
            order_payment_id='order_test_123',
            premium_course=self.course,
        )
        client = client_class.return_value
        client.payment.fetch.return_value = {
            'order_id': 'order_test_123',
            'amount': 37500,
            'currency': 'INR',
            'status': 'captured',
        }

        response = self.client.post(
            '/razorpay/premiumCoursePaymentVerify/',
            {
                'razorpay_order_id': 'order_test_123',
                'razorpay_payment_id': 'pay_test_123',
                'razorpay_signature': 'valid-signature',
            },
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(Order.objects.get(pk=order.pk).isPaid)
        enrollment = ClassEnroll.objects.get(
            username=self.student,
            coursename=self.course,
        )
        self.assertTrue(enrollment.isPaid)

    @patch('premiumCourse.views.razorpay.Client')
    def test_invalid_signature_does_not_enroll(self, client_class):
        Order.objects.create(
            ordered_by=self.student,
            order_amount='375',
            order_payment_id='order_test_123',
            premium_course=self.course,
        )
        client_class.return_value.utility.verify_payment_signature.side_effect = (
            SignatureVerificationError('Invalid signature')
        )

        response = self.client.post(
            '/razorpay/premiumCoursePaymentVerify/',
            {
                'razorpay_order_id': 'order_test_123',
                'razorpay_payment_id': 'pay_test_123',
                'razorpay_signature': 'invalid-signature',
            },
            format='json',
        )

        self.assertEqual(response.status_code, 400)
        self.assertFalse(ClassEnroll.objects.exists())

    @patch('premiumCourse.views.razorpay.Client')
    def test_payment_verification_marks_existing_unpaid_enrollment_paid(
        self,
        client_class,
    ):
        order = Order.objects.create(
            ordered_by=self.student,
            order_amount='375',
            order_payment_id='order_test_123',
            premium_course=self.course,
        )
        enrollment = ClassEnroll.objects.create(
            username=self.student,
            teachername=self.course.email,
            coursename=self.course,
            coursetype=self.course.coursetype,
            isPaid=False,
        )
        client = client_class.return_value
        client.payment.fetch.return_value = {
            'order_id': 'order_test_123',
            'amount': 37500,
            'currency': 'INR',
            'status': 'captured',
        }

        response = self.client.post(
            '/razorpay/premiumCoursePaymentVerify/',
            {
                'razorpay_order_id': 'order_test_123',
                'razorpay_payment_id': 'pay_test_123',
                'razorpay_signature': 'valid-signature',
            },
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(Order.objects.get(pk=order.pk).isPaid)
        enrollment.refresh_from_db()
        self.assertTrue(enrollment.isPaid)
