from django.conf import settings
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.db import models

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    # print('working')
    if created:
        Token.objects.create(user=instance)

class ProfileDetailsModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True,null=True)
    email=models.CharField(max_length=100,blank=True,null=True)
    position=models.CharField(max_length=100,blank=True,null=True)
    dateOfBirth=models.DateField(blank=True,null=True)
    about=models.CharField(max_length=100,blank=True,null=True)
    gender=models.CharField(max_length=100,blank=True,null=True)
    address = models.CharField(max_length=150,blank=True,null=True)
    phonenumber = models.BigIntegerField(blank=True,null=True)
    currentQualification=models.CharField(max_length=150,blank=True,null=True)
    image = models.ImageField(upload_to='photo',blank=True,null=True)
    institutions=models.CharField(max_length=1400,blank=True,null=True)
    course=models.CharField(max_length=1400,blank=True,null=True)
    degree=models.CharField(max_length=1400,blank=True,null=True)
    
    def __str__(self):
        return '{}'.format(self.user)