from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Token
from .models import *


class UserSerializer(serializers.ModelSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=['id','username','email','token']

    def get_token(self,obj):
        
        token=Token.objects.get(user=obj)
        return str(token)
    
class UserProfileDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProfileDetailsModel
        fields="__all__"

