from django.test import TestCase
from django.contrib.auth.models import User

from .models import AllCourses, CourseRegisteration, EnrollCourse
from .serializers import (
    AllCoursesSerializer,
    CourseEnrollSerializer,
    CourseRegisterationSerializer,
)


class CourseImageSeparationTests(TestCase):
    def test_normal_course_image_is_independent_of_category_image(self):
        user = User.objects.create_user(username='student')
        course_type = AllCourses.objects.create(
            courseTypeName='Biology',
            courseImage='inbuildPics/biology-category.jpg',
        )
        course = CourseRegisteration.objects.create(
            user=user,
            courseType=course_type,
            courseName='Cell biology',
            courseImage='inbuildPics/cell-biology.jpg',
        )

        course_data = CourseRegisterationSerializer(course).data
        category_data = AllCoursesSerializer(course_type).data

        self.assertEqual(course_data['courseTypeName'], 'Biology')
        self.assertTrue(course_data['courseImage'].endswith('cell-biology.jpg'))
        self.assertTrue(category_data['courseImage'].endswith('biology-category.jpg'))

        enrollment = EnrollCourse.objects.create(
            user=user,
            courseEnrollName=course,
        )
        enrollment_data = CourseEnrollSerializer(enrollment).data

        self.assertEqual(enrollment_data['courseRegisteredBy'], 'student')
        self.assertTrue(enrollment_data['courseImage'].endswith('cell-biology.jpg'))
