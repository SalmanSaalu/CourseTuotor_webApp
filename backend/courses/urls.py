from django.urls import path
# from accounts import views
from courses import views
from .views  import coursesData,enrollCourse
urlpatterns=[
    path('courseRegister/',coursesData.as_view()),
    path('courseRegister/<int:pk>/',coursesData.as_view()),
    path('allcourses/',views.Allcourses),
    path('browseCourse/',views.BrowseCourse),
    path('enrollCourse/',enrollCourse.as_view()),
    path('topCourses/',views.topCourse)
 
 

]