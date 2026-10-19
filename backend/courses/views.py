from typing import Any
from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import AllCourses, CourseRegisteration
from .serializers import CourseRegisterationSerializer
from django.db import models
from django.shortcuts import render
from rest_framework.response import Response
# Create your views here.
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import *
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import AllCoursesSerializer,CourseRegisterationSerializer,CourseEnrollSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.views.generic import UpdateView


@api_view(['GET'])
def topCourse(request):
    try:
        data = CourseRegisteration.objects.all().order_by('-points')[:12]

        serializer = CourseRegisterationSerializer(
            data,
            many=True,
            context={'request': request}
        )

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception:
        import logging
        logging.getLogger(__name__).exception(
            "Failed to retrieve top courses"
        )

        return Response(
            {"detail": "Failed to retrieve top courses."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@method_decorator(csrf_exempt, name='dispatch')
class enrollCourse(APIView):
    permission_classes=[IsAuthenticated] 
    def get(self,request):
        try:
            if EnrollCourse.objects.filter(user=request.user).exists():
                
                data=EnrollCourse.objects.filter(user=request.user)
                # print(data)
                serializer=CourseEnrollSerializer(
                    data, many=True, context={'request': request}
                )
                # print(serializer.data)
                return Response(serializer.data)
            else:
                message={'detail':'no enrollment'}
                return Response(message)
        except:
            message={"detail":'not displayed the enrolled data'}
            return Response(message)
    def post(self,request):
        try:
            data=request.data
            coursename=data['courseName']  
            coursename=CourseRegisteration.objects.get(courseName=coursename)
            userid=request.user.id
            if EnrollCourse.objects.filter(user=userid,courseEnrollName=coursename.id).exists():      
                message={"detail":'already enrolled'}
                return Response(message)
            else:
                newEnrollment=EnrollCourse.objects.create(user=request.user,courseEnrollName=coursename)   
                point=coursename.points+1
                coursename.points=point
                coursename.save()
                serializer=CourseEnrollSerializer(newEnrollment,many=False)
                return Response(serializer.data)
                

        except:
            message={'detail':'not enrolled'}
            return Response(message)

@api_view(('POST',))
def BrowseCourse(request):
    try:
        data=request.data
        course=data['course']
        if data['browsingType']=='categoryBased':
            courseData=AllCourses.objects.get(courseTypeName=course)
            courseData=CourseRegisteration.objects.filter(courseType=courseData)
            serializer=CourseRegisterationSerializer(courseData,many=True,context={'request': request})
            return Response(serializer.data)
        elif data['browsingType']=='popularBased':
            data=CourseRegisteration.objects.all().order_by('-points')
            serializer=CourseRegisterationSerializer(data,many=True,context={'request': request})
            return Response(serializer.data)
        
    except:
        message={'detail':'no courses'}
        return Response(message)


@method_decorator(csrf_exempt, name='dispatch')
class coursesData(APIView,UpdateView):
    permission_classes=[IsAuthenticated] 
    def get(self,request,*args, **kwargs):
        try:
            user=request.user
            # print(user)
            if CourseRegisteration.objects.filter(user=user).exists():
                courseDetails=CourseRegisteration.objects.filter(user=user)

                # for i in courseDetails:
                #     print(i.courseType)

                serializer=CourseRegisterationSerializer(courseDetails,many=True,context={'request': request})
                return Response(serializer.data)    
            else:

                message={'detail':'No register Courses'}
                return Response(message)
        except :
            message={'detail':'No registered Courses'}
            return Response(message)




    def post(self, request, *args, **kwargs):
        course_name = request.data.get("courseName", "").strip()
        credential = request.data.get("credential", "").strip()
        course_type_name = request.data.get("courseType", "").strip()
        course_image = request.FILES.get("courseImage")

        if not course_name or not credential or not course_type_name:
            return Response(
                {
                    "detail": "Course name, credential, and course type are required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            with transaction.atomic():
                # Find the category or create it if it does not exist.
                course_type = (
                    AllCourses.objects
                    .select_for_update()
                    .filter(courseTypeName__iexact=course_type_name)
                    .first()
                )

                if course_type is None:
                    course_type = AllCourses(
                        courseTypeName=course_type_name
                    )

                if not course_type.pk:
                    course_type.save()

                # Save the course for the currently authenticated user.
                registered_course = CourseRegisteration.objects.create(
                    user=request.user,
                    email=request.user.email,
                    courseType=course_type,
                    courseName=course_name,
                    courseImage=course_image,
                    credential=credential,
                    points=0,
                )

            serializer = CourseRegisterationSerializer(
                registered_course,
                many=False,
                context={"request": request},
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        except Exception:
            import logging
            logging.getLogger(__name__).exception(
                "Course registration failed"
            )
            return Response(
                {"detail": "Course registration failed. Check server logs."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        
        
    def put(self, request, format=None):
        try:
            course_name = request.data.get("courseName", "").strip()
            course_type_name = request.data.get("courseType", "").strip()
            credential = request.data.get("credential", "").strip()
            original_name = request.data.get("originalName", "").strip()
            course_image = request.FILES.get("courseImage")

            missing_fields = []

            if not course_name:
                missing_fields.append("courseName")

            if not course_type_name:
                missing_fields.append("courseType")

            if not credential:
                missing_fields.append("credential")

            if not original_name:
                missing_fields.append("originalName")

            if missing_fields:
                return Response(
                    {
                        "detail": "Required fields are missing or empty.",
                        "missing_fields": missing_fields,
                        "received_data": {
                            "courseName": request.data.get("courseName"),
                            "courseType": request.data.get("courseType"),
                            "credential": request.data.get("credential"),
                            "originalName": request.data.get("originalName"),
                        },
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            with transaction.atomic():
                course = CourseRegisteration.objects.get(
                    user=request.user,
                    courseName=original_name,
                )

                course_type = AllCourses.objects.filter(
                    courseTypeName__iexact=course_type_name
                ).first()

                if course_type is None:
                    course_type = AllCourses.objects.create(
                        courseTypeName=course_type_name,
                    )

                course.courseName = course_name
                course.courseType = course_type
                course.credential = credential
                if course_image:
                    course.courseImage = course_image
                course.save()

            serializer = CourseRegisterationSerializer(
                course,
                context={"request": request},
            )

            return Response(serializer.data, status=status.HTTP_200_OK)

        except CourseRegisteration.DoesNotExist:
            return Response(
                {"detail": "Course not found or you do not own this course."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:
            import logging
            logging.getLogger(__name__).exception("Course update failed")
            return Response(
                {"detail": "Course update failed. Check server logs."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, request, pk):
        try:
            course = CourseRegisteration.objects.get(
                pk=pk,
                user=request.user
            )

            course.delete()

            return Response(
                {"detail": "Course deleted successfully"},
                status=status.HTTP_200_OK
            )

        except CourseRegisteration.DoesNotExist:
            return Response(
                {"detail": "Course not found or you do not own this course"},
                status=status.HTTP_404_NOT_FOUND
            )



@api_view(['GET'])
def Allcourses(request):
    # Return only course types that have at least one NORMAL course.
    allcourses = AllCourses.objects.filter(
        registeredCourseType__isnull=False
    ).distinct()

    serializer = AllCoursesSerializer(
        allcourses,
        many=True,
        context={'request': request}
    )

    return Response(serializer.data)