from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import ChatRoomSerializer
from rest_framework.response import Response
import random


@method_decorator(csrf_exempt, name='dispatch')
@api_view(('POST',))
@permission_classes((IsAuthenticated, ))
def roomCreate(request):
    try:
        data=request.data
        teacher=data['teachername']
        number=random.randint(10,99)
        reciever=User.objects.get(username=teacher)
        if ChatRoom.objects.filter(senderChatRoom=request.user,recieverChatRoom=reciever).exists():
                data=ChatRoom.objects.get(senderChatRoom=request.user,recieverChatRoom=reciever)
                serializer=ChatRoomSerializer(data,many=False)
                return Response(serializer.data)
        elif ChatRoom.objects.filter(senderChatRoom=reciever,recieverChatRoom=request.user).exists():
                data=ChatRoom.objects.get(senderChatRoom=reciever,recieverChatRoom=request.user)
                serializer=ChatRoomSerializer(data,many=False)
                return Response(serializer.data)
        else:
            data=ChatRoom.objects.create(senderChatRoom=request.user,recieverChatRoom=reciever,roomNumber=number)
            serializer=ChatRoomSerializer(data,many=False)
            return Response(serializer.data)
    except:
        message={'detail':'chat room not created'}
        return Response(message)
    
# @method_decorator(csrf_exempt, name='dispatch')
# @api_view(('GET',))
# @permission_classes((IsAuthenticated, ))
# def recieverName(request):
     