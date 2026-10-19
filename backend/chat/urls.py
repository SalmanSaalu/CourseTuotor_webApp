from django.urls import path, include
from chat import views as chat_views
from .views import *
 
from django.urls import path
from chat import views

urlpatterns=[
    path('roomCreate/',views.roomCreate),
    # path('recieverName/',recieverName)

]