from django.core.serializers import python
from django.shortcuts import render
from django.contrib.auth.models import User
# Create your views here.
from django.contrib.auth.hashers import make_password
from django.http import HttpResponse,JsonResponse
import json
from django.utils.encoding import force_bytes,force_str
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.views import View
from rest_framework.decorators import api_view,permission_classes

from rest_framework.response import Response
from . serializers import UserSerializer,UserProfileDetailsSerializer
from rest_framework import status
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import login,logout
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from .models import *




@method_decorator(csrf_exempt, name='dispatch')
class profileDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            profile = ProfileDetailsModel.objects.get(user=request.user)
        except ProfileDetailsModel.DoesNotExist:
            return Response(
                {'detail': 'No profile data. Please complete your profile.'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserProfileDetailsSerializer(profile, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data
        user = request.user

        try:
            # Update or create the authenticated user's profile.
            if 'username' not in data:
                try:
                    profile = ProfileDetailsModel.objects.get(user=user)
                except ProfileDetailsModel.DoesNotExist:
                    return Response(
                        {'detail': 'No profile data. Please complete your profile.'},
                        status=status.HTTP_404_NOT_FOUND
                    )

                serializer = UserProfileDetailsSerializer(profile)
                return Response(serializer.data, status=status.HTTP_200_OK)

            required_fields = [
                'position',
                'about',
                'gender',
                'DateOfBirth',
                'phonenumber',
                'address',
                'currentQualification',
            ]

            missing_fields = [
                field for field in required_fields
                if field not in data
            ]

            if missing_fields:
                return Response(
                    {
                        'detail': 'Required profile fields are missing.',
                        'missing_fields': missing_fields,
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Parse the education-related JSON data if provided.
            try:
                institutions = json.loads(data.get('InstitutionTotalData', '[]'))
                courses = json.loads(data.get('courseTotalData', '[]'))
                degrees = json.loads(data.get('degreeTotalData', '[]'))
            except (json.JSONDecodeError, TypeError):
                return Response(
                    {'detail': 'Invalid education data format.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Preserve the data processing from your original code.
            institution_string = ''
            course_string = ''
            degree_string = ''

            for key in institutions:
                institution_string += '@' + str(institutions[key])
                course_string += '@' + str(courses.get(key, ''))
                degree_string += '@' + str(degrees.get(key, ''))

            profile_data = {
                'email': user.email,
                'position': data['position'],
                'dateOfBirth': data['DateOfBirth'],
                'about': data['about'],
                'gender': data['gender'],
                'address': data['address'],
                'phonenumber': data['phonenumber'],
                'currentQualification': data['currentQualification'],
            }

            if 'profileImage' in data:
                profile_data['image'] = data['profileImage']

            profile, created = ProfileDetailsModel.objects.update_or_create(
                user=user,
                defaults=profile_data
            )

            serializer = UserProfileDetailsSerializer(profile)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
            )

        except Exception as exc:
            # Log the actual exception in the Django terminal.
            print(
                f'Profile details error: {type(exc).__name__}: {exc}'
            )
            return Response(
                {'detail': 'Unable to save profile details.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )




@api_view(['POST'])
def registerUser(request):
    data = request.data

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return Response(
            {'detail': 'Email and password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {'detail': 'User with this email already registered.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            is_active=False
        )

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        domain = get_current_site(request).domain

        html_message = render_to_string('email.html', {
            'user': user,
            'domain': domain,
            'uid': uidb64,
            'token': token,
        })

        plain_message = strip_tags(html_message)

        email_message = EmailMultiAlternatives(
            subject='Verification of BeginTheToutor Account Generation',
            body=plain_message,
            from_email=settings.EMAIL_HOST_USER,
            to=[user.email],
        )

        email_message.attach_alternative(html_message, 'text/html')
        email_message.send(fail_silently=False)

        return Response(
            {'detail': 'Verification email sent. Please check your inbox.'},
            status=status.HTTP_201_CREATED
        )

    except Exception as exc:
        print(f'Registration error: {type(exc).__name__}: {exc}')

        return Response(
            {
                'detail': (
                    'The account may have been created, but registration '
                    'could not be completed. Check the server logs.'
                )
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


class verificationView(View):
    def get(self, request, uidb64, token):
        try:
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=user_id)
        except (ValueError, TypeError, OverflowError, User.DoesNotExist):
            return render(
                request,
                'verify.html',
                {'verified': False, 'message': 'Invalid verification link.'},
                status=400
            )

        if user.is_active:
            return render(
                request,
                'verify.html',
                {'user': user, 'verified': True,
                 'message': 'Your account is already verified.'}
            )

        if not default_token_generator.check_token(user, token):
            return render(
                request,
                'verify.html',
                {'verified': False, 'message': 'Invalid or expired verification link.'},
                status=400
            )

        user.is_active = True
        user.save(update_fields=['is_active'])

        return render(
            request,
            'verify.html',
            {'user': user, 'verified': True,
             'message': 'Your email has been verified successfully.'}
        )


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def login(request):

    data=request.data
    email=data['email']
    password=data['password']
    try:
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            if user.is_active!=False:
                if user is not None:    
                    if user.check_password(password):
                        serializer=UserSerializer(user,many=False)
                        return Response(serializer.data)
                    else:
                        message={'detail':'password is incorrect'}
                        return Response(message,status=status.HTTP_400_BAD_REQUEST)
            else:
                message={'detail':'please verify the email send'}
                return Response(message,status=status.HTTP_400_BAD_REQUEST)



        else:
            message={'detail':'Invalid email address '}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)


    except:
        message={'detail':'Invalid email address or password'}
        return Response(message)


# @api_view(['GET'])
# def product(request,pk):
#     print('eork')