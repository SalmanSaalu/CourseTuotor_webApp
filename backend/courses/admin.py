from django.contrib import admin
from .models import *


admin.site.register(AllCourses)

class courseRegisterAdmin(admin.ModelAdmin):

    list_display = ['id','user','courseName','courseType','credential']
admin.site.register(CourseRegisteration,courseRegisterAdmin)


class enrollCourseAdmin(admin.ModelAdmin):
    list_display=['id','user','courseEnrollName']
admin.site.register(EnrollCourse,enrollCourseAdmin)