from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Order(models.Model):
    ordered_by = models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)
    order_amount = models.CharField(max_length=25)
    order_payment_id = models.CharField(max_length=100)
    premium_course = models.ForeignKey(
        'PremiumCourses',
        related_name='payment_orders',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    isPaid = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.ordered_by.username


class PremiumCourseType(models.Model):
    courseTypeName = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return '{}'.format(self.courseTypeName)
    
class PremiumCourses(models.Model):
    username=models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)
    email=models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    adhaar = models.CharField(max_length=12)
    dob=models.DateField(max_length=100)
    about=models.CharField(max_length=100)
    linkedin=models.CharField(max_length=100)
    qualification=models.CharField(max_length=100)
    coursename=models.CharField(max_length=100)
    coursedays=models.CharField(max_length=150)
    coursetime=models.CharField(max_length=20)
    coursetype=models.ForeignKey(PremiumCourseType,on_delete=models.CASCADE,blank=True)
    experience=models.IntegerField()
    amount=models.IntegerField()
    courseImage = models.ImageField(
        upload_to='premiumCoursePics/',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.coursename

class ClassEnroll(models.Model):
    username=models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)
    teachername=models.CharField(max_length=100)
    coursename=models.ForeignKey(PremiumCourses,on_delete=models.CASCADE,blank=True,null=True)
    coursetype=models.ForeignKey(PremiumCourseType,on_delete=models.CASCADE,blank=True,null=True)
    isPaid=models.BooleanField(default=False)

    
    def __str__(self):
        return self.coursename.coursename