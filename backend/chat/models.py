from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.
class ChatRoom(models.Model):
    senderChatRoom=models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True,related_name='senderChatRoom')
    recieverChatRoom=models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True,related_name='recieverChatRoom')
    roomNumber=models.CharField(max_length=100)

    def __str__(self):
        return f'{self.senderChatRoom}-{self.recieverChatRoom}-{self.roomNumber}'


class AllMessages(models.Model):
    sender=models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True,related_name='sender')
    reciever=models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True,related_name='reciever')
    room=models.ForeignKey("Chatroom",on_delete=models.CASCADE,blank=True,null=True)
    message=models.CharField(max_length=2000)
    timestamp=models.CharField(max_length=100)
    added_time=models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f'{self.room}'