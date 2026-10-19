from django.db import models
from django.contrib.auth.models import User

# Create your models here.
    

class AllCourses(models.Model):
    courseTypeName=models.CharField(max_length=100,blank=True,null=True)
    courseImage=models.ImageField(upload_to='inbuildPics',blank=True,null=True)

    def __str__(self):
        return '{}'.format(self.courseTypeName)
    
class CourseRegisteration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True,null=True)
    email=models.CharField(max_length=100,blank=True,null=True)
    courseType=models.ForeignKey(AllCourses,related_name='registeredCourseType', on_delete=models.CASCADE,max_length=100,blank=True,null=True)
    courseName=models.CharField(max_length=100,blank=True,null=True)
    courseImage=models.ImageField(upload_to='inbuildPics',blank=True,null=True)
    credential=models.CharField(max_length=100,blank=True,null=True)
    points=models.IntegerField(blank=True,null=True)
    
    def __str__(self):
        return '{}'.format(self.user)
    
class EnrollCourse(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE,blank=True,null=True)
    courseEnrollName=models.ForeignKey(CourseRegisteration, on_delete=models.CASCADE,max_length=100,blank=True,null=True)

    def __str__(self):
        return '{}'.format(self.user)