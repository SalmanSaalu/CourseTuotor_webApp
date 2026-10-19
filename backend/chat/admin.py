from django.contrib import admin
from .models import *
# Register your models here.
class RoomAdminAdmin(admin.ModelAdmin):
    list_display=['senderChatRoom','recieverChatRoom','roomNumber']
admin.site.register(ChatRoom,RoomAdminAdmin)

class MessageAdmin(admin.ModelAdmin):
    list_display=['sender','reciever','room','message','timestamp','added_time']
admin.site.register(AllMessages,MessageAdmin)