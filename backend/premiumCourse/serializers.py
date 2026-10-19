from rest_framework import serializers

from .models import ClassEnroll, Order, PremiumCourses




class OrderSerializer(serializers.ModelSerializer):
    order_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = Order
        fields = '__all__'
        depth = 2

class PremiumRegisterCourseSerializer(serializers.ModelSerializer):
    courseimage=serializers.SerializerMethodField(read_only=True)
    coursetypename=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=PremiumCourses
        fields='__all__'
        extra_fields = ['courseimage','coursetypename']


    def get_courseimage(self, data):
        if data.courseImage and data.courseImage.name:
            request = self.context.get('request')

            if request:
                return request.build_absolute_uri(data.courseImage.url)

            return data.courseImage.url

        return None


    def get_coursetypename(self,obj):
        return obj.coursetype.courseTypeName if obj.coursetype else None
    
    

class PremiumCourseEnrollProfileSerializer(serializers.ModelSerializer):
    coursedays=serializers.SerializerMethodField(read_only=True)
    coursetime=serializers.SerializerMethodField(read_only=True)
    courseFullname=serializers.SerializerMethodField(read_only=True)
    coursetypename=serializers.SerializerMethodField(read_only=True)
    courseimage=serializers.SerializerMethodField(read_only=True)
    FullAmount=serializers.SerializerMethodField(read_only=True)
    teacher_id=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=ClassEnroll
        fields=[
            'id', 'username', 'teachername', 'coursename', 'coursetype',
            'isPaid', 'coursedays', 'coursetime', 'courseFullname',
            'coursetypename', 'courseimage', 'FullAmount', 'teacher_id',
        ]

    def get_coursedays(self,obj):
        return obj.coursename.coursedays
    
    def get_coursetime(self,obj):
        return obj.coursename.coursetime
    
    def get_courseFullname(self,obj):
        return obj.coursename.coursename
    
    def get_coursetypename(self, obj):
        return obj.coursetype.courseTypeName if obj.coursetype else None

    def get_courseimage(self, obj):
        course_image = obj.coursename.courseImage
        if not course_image or not course_image.name:
            return None
        request = self.context.get('request')
        return request.build_absolute_uri(course_image.url) if request else course_image.url
    
    def get_FullAmount(self,obj):
        return obj.coursename.amount

    def get_teacher_id(self,obj):
        return obj.coursename.username_id
    



class PremiumClassBrowseSerializer(serializers.ModelSerializer):
    courseimage=serializers.SerializerMethodField(read_only=True)
    coursetypename=serializers.SerializerMethodField(read_only=True)
    isPaid=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=PremiumCourses
        fields='__all__'
        extra_fields = ['courseimage','coursetypename']

    def get_courseimage(self,obj):
        if not obj.courseImage or not obj.courseImage.name:
            return None
        request = self.context.get('request')
        return request.build_absolute_uri(obj.courseImage.url) if request else obj.courseImage.url

    def get_coursetypename(self,obj):
        return obj.coursetype.courseTypeName if obj.coursetype else None
    
    def get_isPaid(self,obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        enrollment = ClassEnroll.objects.filter(
            coursename=obj,
            username=request.user,
        ).first()
        return enrollment.isPaid if enrollment else False