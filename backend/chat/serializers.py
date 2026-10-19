from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class ChatRoomSerializer(serializers.ModelSerializer):
    senderName=serializers.SerializerMethodField(read_only=True)
    recieverName=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=ChatRoom
        fields=['senderChatRoom','recieverChatRoom','senderName','recieverName','roomNumber']

    def get_senderName(self,obj):
        return obj.senderChatRoom.username

    def get_recieverName(self,obj):
        return obj.recieverChatRoom.username