
from rest_framework import serializers

from .models import AllCourses, CourseRegisteration, EnrollCourse

class AllCoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model=AllCourses
        fields="__all__"

class CourseRegisterationSerializer(serializers.ModelSerializer):
    courseImage=serializers.SerializerMethodField(read_only=True)
    courseTypeName=serializers.SerializerMethodField(read_only=True)
    enrollment_status=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=CourseRegisteration
        fields=['id','user','email','courseType','courseName','credential','points','courseImage','courseTypeName','enrollment_status']
        

    def get_courseImage(self, obj):
        if obj.courseImage and obj.courseImage.name:
            request = self.context.get('request')
            image_url = obj.courseImage.url

            if request:
                return request.build_absolute_uri(image_url)

            return image_url

        return None

    def get_courseTypeName(self,obj):
        return obj.courseType.courseTypeName if obj.courseType else None



    def get_enrollment_status(self, obj):
        request = self.context.get('request')

        if not request or not request.user.is_authenticated:
            return False

        return EnrollCourse.objects.filter(
            courseEnrollName=obj.id,
            user=request.user
        ).exists()


    
class CourseEnrollSerializer(serializers.ModelSerializer):
    courseEnrolledName=serializers.SerializerMethodField(read_only=True)
    courseEnrolledBy=serializers.SerializerMethodField(read_only=True)
    courseRegisteredBy=serializers.SerializerMethodField(read_only=True)
    courseImage=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=EnrollCourse
        fields=['id','user','courseEnrolledBy','courseEnrollName','courseRegisteredBy','courseEnrolledName','courseImage']

    def get_courseEnrolledBy(self,obj):
        return (obj.user.username)

    def get_courseEnrolledName(self,obj):
        return (obj.courseEnrollName.courseName)

    def get_courseRegisteredBy(self,obj):
        course = obj.courseEnrollName
        return course.user.username if course and course.user else None
    
    def get_courseImage(self,obj):
        course = obj.courseEnrollName
        if not course or not course.courseImage or not course.courseImage.name:
            return None

        image_url = course.courseImage.url
        request = self.context.get('request')
        return request.build_absolute_uri(image_url) if request else image_url


    
