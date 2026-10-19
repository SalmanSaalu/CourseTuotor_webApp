from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from premiumCourse.models import *
import datetime


# @shared_task(bind=True)
# def test_func(self):
#     for i in range(11):
#         print(i)
#     return "DOne"

@shared_task(bind=True)
def send_mail_func(self):
    data=PremiumCourses.objects.all()
    # print(timezone.now().date())
    dayName=datetime.datetime.now().date().weekday()
    # 0=monday
    # 1=tuesday
    # 2=wednesday
    # 3=thursday
    # 4=friday
    # 5=saturday
    # 6=sunday
    # print(datetime.datetime.now())
    # print(dayName)
    if(dayName==0):
        day="monday"
    elif(dayName==1):
        day="tuesday"
    elif(dayName==2):
        day="wednesday"
    elif(dayName==3):
        day="thursday"
    elif(dayName==4):
        day="friday"
    elif(dayName==5):
        day="saturday"
    elif(dayName==6):
        day="sunday"


    # print(day)
    
    
    for courses in data:
        
        daysInArray=courses.coursedays.split(",")
        
        
        if day in daysInArray:
           
            # print("teachername: ",courses.username,"-","Registered course name :",courses.coursename,"-","registered course days: ",courses.coursedays)
            
            data=ClassEnroll.objects.filter(teachername=courses.username,coursename=courses)
            for enrollStudents in data:
                # print("enrolled students name: ",enrollStudents.username,"-","enrolled course name :",enrollStudents.coursename,"-","enrolled teacher name",enrollStudents.teachername)
                # email
                print('working1')
                if(enrollStudents.username.username=="rex@gmail.com"):
                    # print('working2')
                    recipient="salmansaalu05@gmail.com"
                    
                    message = EmailMultiAlternatives(
                        subject = "Class Scheduled", 
                        body ="You have "+ courses.coursename+" class scheduled at " + courses.coursetime +" please be on time.",
                        from_email = settings.EMAIL_HOST_USER,
                        to= [recipient]
                            )
                    message.send()
                    
                elif(enrollStudents.username.username=="sarath@gmail.com"):
                    # print('working3')
                    recipient="salmanpp05@gmail.com"
                    

                    message = EmailMultiAlternatives(
                        subject = "Class Scheduled", 
                        body ="You have " + courses.coursename+" class scheduled at" + courses.coursetime +" please be on time.",
                        from_email = settings.EMAIL_HOST_USER,
                        to= [recipient]
                            )
                    message.send()
                else:
                    # print('working4')
                    recipient="salmansaalu10@gmail.com"
                    

                    message = EmailMultiAlternatives(
                        subject = "Class Scheduled", 
                        body ="You have " + courses.coursename+" class scheduled at" + courses.coursetime +" please be on time.",
                        from_email = settings.EMAIL_HOST_USER,
                        to= [recipient]
                            )
                    message.send()

# celery -A backend beat -l INFO - for changing schedules
# below 2 needed
# celery -A backend.celery worker --pool=solo -l info -- ::run with server
# redis-server 