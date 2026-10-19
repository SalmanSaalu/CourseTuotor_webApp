from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(PremiumCourseType)


class PremiumCourseAdmin(admin.ModelAdmin):

    list_display = ['id','ordered_by','order_amount','order_payment_id','isPaid','order_date']
admin.site.register(Order,PremiumCourseAdmin)


class PremiumCourseRegisterAdmin(admin.ModelAdmin):
    list_display=['username','coursename','coursedays','coursetime','coursetype','amount']
admin.site.register(PremiumCourses,PremiumCourseRegisterAdmin)


class PremiumClassEnrollAdmin(admin.ModelAdmin):
    list_display=['username','teachername','coursename','coursetype','isPaid']
admin.site.register(ClassEnroll,PremiumClassEnrollAdmin)