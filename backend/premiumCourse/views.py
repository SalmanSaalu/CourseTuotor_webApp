import json
import logging

from .models import ClassEnroll

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.contrib.auth.models import User

from .models import PremiumCourses
from .serializers import PremiumRegisterCourseSerializer
from .models import PremiumCourseType

logger = logging.getLogger(__name__)
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
import environ
import razorpay
from razorpay.errors import SignatureVerificationError
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Order
from .serializers import OrderSerializer
from django.contrib.auth.models import User
# env = environ.Env()
from django.shortcuts import render,redirect
from .serializers import PremiumRegisterCourseSerializer,PremiumClassBrowseSerializer,PremiumCourseEnrollProfileSerializer
from . models import *
from django.conf import settings                                                                                                                                                       
from django.http import HttpResponse
from django.core.mail import EmailMultiAlternatives
import datetime
import os
from dotenv import load_dotenv
load_dotenv()

# you have to create .env file in same folder where you are using environ.Env()
# reading .env file which located in api folder
# environ.Env.read_env()
# from .tasks import send_mail_func
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def teacherEnrolledStudents(request):
    enrollments = (
        ClassEnroll.objects
        .filter(
            teachername=request.user.username,
            isPaid=True
        )
        .select_related('username', 'coursename')
    )

    students = []

    for enrollment in enrollments:
        if not enrollment.username or not enrollment.coursename:
            continue

        students.append({
            'student_id': enrollment.username.id,
            'student_username': enrollment.username.username,
            'student_email': enrollment.username.email,
            'course_id': enrollment.coursename.id,
            'course_name': enrollment.coursename.coursename,
        })

    return Response(students)


def test(request):
    data=PremiumCourses.objects.all()
    # print(timezone.now().date())
    dayName=datetime.datetime.now().date().weekday()
    print(datetime.datetime.now())
    print(dayName)
    if(dayName==0):
        day="monday"
    elif(dayName==1):
        day="tuesday"
    elif(dayName==2):
        day="wednesday"
    elif(dayName==3):
        day="thursday"
    elif(dayName==4):
        day="friday"
    elif(dayName==5):
        day="saturday"
    elif(dayName==6):
        day="sunday"

    print(day)
    
    
    for courses in data:
        daysInArray=courses.coursedays.split(",")
        if day in daysInArray:
            print("teachername: ",courses.username,"-","Registered course name :",courses.coursename,"-","registered course days: ",courses.coursedays)
            
            data=ClassEnroll.objects.filter(teachername=courses.username,coursename=courses)
            for enrollStudents in data:
                print("enrolled students name: ",enrollStudents.username,"-","enrolled course name :",enrollStudents.coursename,"-","enrolled teacher name",enrollStudents.teachername)
                # email
                
                # if(enrollStudents.username.username=="rex@gmail.com"):
                    
                #     recipient="salmanpp05@gmail.com"
                    
                #     message = EmailMultiAlternatives(
                #         subject = "Class Scheduled", 
                #         body ="You have class scheduled at " + courses.coursetime +" please be on time.",
                #         from_email = settings.EMAIL_HOST_USER,
                #         to= [recipient]
                #             )
                #     message.send()
                    
                # elif(enrollStudents.username.username=="sarath@gmail.com"):
                #     recipient="salmansaalu10@gmail.com"
                    

                #     message = EmailMultiAlternatives(
                #         subject = "Class Scheduled", 
                #         body ="You have class scheduled at" + courses.coursetime +"please be on time.",
                #         from_email = settings.EMAIL_HOST_USER,
                #         to= [recipient]
                #             )
                #     message.send()
                # else:
                #     recipient="salmansaalu05@gmail.com"
                    

                #     message = EmailMultiAlternatives(
                #         subject = "Class Scheduled", 
                #         body ="You have class scheduled at" + courses.coursetime +"please be on time.",
                #         from_email = settings.EMAIL_HOST_USER,
                #         to= [recipient]
                #             )
                #     message.send()
                
                
            print("______________")
    return HttpResponse("done")

# def sms(request):




#     # message.attach_alternative(html_message, "text/html")
#     message.send()
#     return HttpResponse("messages sent!", 200)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def premiumClassEnrollProfile(request):
    try:
        user=request.user  
        if ClassEnroll.objects.filter(username=user).exists():
            
            data=ClassEnroll.objects.filter(username=user)
            serializer=PremiumCourseEnrollProfileSerializer(
                data, many=True, context={'request': request}
            )
            # print(serializer.data)
            return Response(serializer.data)
        else:
            message={'detail':'no data'}
            return Response(message)
    except: 
        message={'detail':'error occured'}
        return Response(message)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def premiumClassEnroll(request):
    try:
        course = PremiumCourses.objects.get(pk=request.data.get('course'))
        if course.username == request.user:
            return Response(
                {'detail': 'You cannot enroll in your own course.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if ClassEnroll.objects.filter(
            username=request.user,
            coursename=course,
            isPaid=True,
        ).exists():
            return Response(
                {'detail': 'You are already enrolled in this course.'},
                status=status.HTTP_409_CONFLICT,
            )

        if course.amount <= 0:
            return Response(
                {'detail': 'This course has an invalid payment amount.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        public_key = os.getenv('PUBLIC_KEY')
        secret_key = os.getenv('SECRET_KEY_RAZORPAY')
        if not public_key or not secret_key:
            logger.error('Razorpay credentials are not configured.')
            return Response(
                {'detail': 'Payment service is not configured.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        client = razorpay.Client(auth=(public_key, secret_key))
        payment = client.order.create({
            'amount': course.amount * 100,
            'currency': 'INR',
            'payment_capture': 1,
        })
        Order.objects.create(
            ordered_by=request.user,
            order_amount=str(course.amount),
            order_payment_id=payment['id'],
            premium_course=course,
        )

        return Response({
            'razorpay_key': public_key,
            'order': payment,
            'course_name': course.coursename,
        }, status=status.HTTP_201_CREATED)
    except PremiumCourses.DoesNotExist:
        return Response(
            {'detail': 'Premium course not found.'},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception:
        logger.exception('Could not create premium course payment order.')
        return Response(
            {'detail': 'Could not start payment. Please try again.'},
            status=status.HTTP_502_BAD_GATEWAY,
        )


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def verifyPremiumCoursePayment(request):
    order_id = request.data.get('razorpay_order_id')
    payment_id = request.data.get('razorpay_payment_id')
    signature = request.data.get('razorpay_signature')

    if not order_id or not payment_id or not signature:
        return Response(
            {'detail': 'Payment verification details are incomplete.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    order = Order.objects.filter(
        order_payment_id=order_id,
        ordered_by=request.user,
        premium_course__isnull=False,
    ).select_related('premium_course').first()
    if not order:
        return Response(
            {'detail': 'Payment order not found.'},
            status=status.HTTP_404_NOT_FOUND,
        )

    public_key = os.getenv('PUBLIC_KEY')
    secret_key = os.getenv('SECRET_KEY_RAZORPAY')
    if not public_key or not secret_key:
        logger.error('Razorpay credentials are not configured.')
        return Response(
            {'detail': 'Payment service is not configured.'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    client = razorpay.Client(auth=(public_key, secret_key))
    payment_details = {
        'razorpay_order_id': order_id,
        'razorpay_payment_id': payment_id,
        'razorpay_signature': signature,
    }

    try:
        client.utility.verify_payment_signature(payment_details)
        payment = client.payment.fetch(payment_id)
    except SignatureVerificationError:
        return Response(
            {'detail': 'Payment signature is invalid.'},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception:
        logger.exception('Could not verify premium course payment.')
        return Response(
            {'detail': 'Could not verify payment. Please contact support.'},
            status=status.HTTP_502_BAD_GATEWAY,
        )

    expected_amount = int(order.order_amount) * 100
    if (
        payment.get('order_id') != order_id
        or payment.get('amount') != expected_amount
        or payment.get('currency') != 'INR'
        or payment.get('status') != 'captured'
    ):
        return Response(
            {'detail': 'Payment is not captured for the expected amount.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    with transaction.atomic():
        order = Order.objects.select_for_update().get(pk=order.pk)
        if not order.isPaid:
            course = order.premium_course
            enrollment, _ = ClassEnroll.objects.get_or_create(
                username=request.user,
                coursename=course,
                defaults={
                    'teachername': course.email,
                    'coursetype': course.coursetype,
                    'isPaid': True,
                },
            )
            if not enrollment.isPaid:
                enrollment.teachername = course.email
                enrollment.coursetype = course.coursetype
                enrollment.isPaid = True
                enrollment.save(
                    update_fields=['teachername', 'coursetype', 'isPaid']
                )
            order.isPaid = True
            order.save(update_fields=['isPaid'])

    return Response({'detail': 'Enrollment complete.'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def premiumCourseBrowse(request):
    try:
        data=PremiumCourses.objects.all()
        serializer = PremiumClassBrowseSerializer(
            data, many=True, context={'request': request}
        )
        # print(serializer.data)
        return Response(serializer.data)
    except:
        message={'detail':'error'}
        return Response(message)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def premiumCourseRegister(request):
    try:
        data = request.data
        logger.warning("Premium registration data: %s", data)
        logger.warning("Available course types: %s", list(
            PremiumCourseType.objects.values_list("courseTypeName", flat=True)
        ))

        required_fields = [
            'phone',
            'adhaar',
            'dob',
            'linkedin',
            'qualification',
            'coursename',
            'coursetype',
            'coursedays',
            'coursetime',
            'teachingexp',
            'amount',
        ]

        missing_fields = [
            field for field in required_fields
            if not str(data.get(field, '')).strip()
        ]

        if missing_fields:
            return Response(
                {
                    'detail': 'Please provide all required fields.',
                    'missing_fields': missing_fields,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        course_type_name = str(data.get('coursetype', '')).strip()

        if not course_type_name:
            return Response(
                {'detail': 'Course type is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check whether the course type already exists
        course_type = PremiumCourseType.objects.filter(
            courseTypeName__iexact=course_type_name
        ).first()

        # Create it if it does not exist
        if course_type is None:
            course_type = PremiumCourseType.objects.create(
                courseTypeName=course_type_name
            )

        phone = str(data.get('phone')).strip()
        adhaar = str(data.get('adhaar')).strip()

        if not phone.isdigit() or not 7 <= len(phone) <= 15:
            return Response(
                {'detail': 'Please provide a valid phone number.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not adhaar.isdigit() or len(adhaar) != 12:
            return Response(
                {'detail': 'Please provide a valid 12-digit Aadhaar number.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            experience = int(data.get('teachingexp'))
            amount = int(data.get('amount'))
        except (TypeError, ValueError):
            return Response(
                {'detail': 'Teaching experience and amount must be valid numbers.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if experience < 0 or amount < 0:
            return Response(
                {'detail': 'Experience and amount cannot be negative.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        course_days = data.get('coursedays')

        if isinstance(course_days, list):
            course_days = ','.join(course_days)
        else:
            course_days = str(course_days).strip()

        if not course_days:
            return Response(
                {'detail': 'Please select at least one course day.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        
        course = PremiumCourses.objects.create(
            username=request.user,
            email=request.user.email,
            phone=phone,
            adhaar=adhaar,
            dob=data.get('dob'),
            about=data.get('about', ''),
            linkedin=data.get('linkedin'),
            qualification=data.get('qualification'),
            coursename=data.get('coursename'),
            coursedays=course_days,
            coursetime=data.get('coursetime'),
            experience=experience,
            amount=amount,
            coursetype=course_type,
            courseImage=request.FILES.get('courseImage')
        )


        serializer = PremiumRegisterCourseSerializer(
            course,
            many=False,
            context={'request': request},
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )

    except Exception:
        logger.exception('Premium course registration failed')

        return Response(
            {'detail': 'Registration failed. Check the Django server logs.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def isPaid(request):
    user=request.user
    if Order.objects.filter(ordered_by=user).exists():
        message={'detail':'user already enrolled in premium course','response':'true'}
        return Response(message)
    else:
        message={'detail':'not enrolled','response':'false'}
        return Response(message)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def start_payment(request):
    # request.data is coming from frontend
    try:
        data=request.data
        # print(data)
        amount = request.data['amount']
        name = request.data['name']
        # setup razorpay client this is the client to whome user is paying money that's you
        client = razorpay.Client(auth=(os.getenv('PUBLIC_KEY'), os.getenv('SECRET_KEY_RAZORPAY')))
    
        # create razorpay order
        # the amount will come in 'paise' that means if we pass 50 amount will become
        # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
        # mumtiply it by 100 so it will be 50 rupees.
        payment = client.order.create({"amount": int(amount) * 100, 
                                    "currency": "INR", 
                                    "payment_capture": "1"})

        # we are saving an order with isPaid=False because we've just initialized the order
        # we haven't received the money we will handle the payment succes in next 
        # function
        data=User.objects.get(username=name)
        order = Order.objects.create(ordered_by=data, 
                                    order_amount=amount, 
                                    order_payment_id=payment['id'])
        
        

        response_data = {
                    "callback_url": "/razorpay/payment/success/",
                    "razorpay_key": os.getenv('PUBLIC_KEY'),
                    "order": payment,
                    "username": name
            }

        print(response_data)

        return Response(response_data)
    
    except:
        message={'data':'payment not proceeded'}
        return Response(message)


@api_view(['POST'])
def handle_payment_success(request):
    # request.data is coming from frontend
       if request.method == "POST":
        if "razorpay_signature" in request.POST:
            client = razorpay.Client(auth=(os.getenv('PUBLIC_KEY'), os.getenv('SECRET_KEY_RAZORPAY')))
            payment_verification = client.utility.verify_payment_signature(request.POST)

            if payment_verification:
                orderId=request.data['razorpay_order_id']
                if Order.objects.filter(order_payment_id=orderId).exists():
                    data=Order.objects.get(order_payment_id=orderId)
                    data.isPaid=True
                    data.save()
                return redirect("/")
                return Response({"res":"success"})
                # Logic to perform is payment is successful
            else:
                return Response({"res":"failed"})
                # Logic to perform is payment is unsuccessful