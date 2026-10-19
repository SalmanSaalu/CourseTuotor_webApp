from django.urls import path
from accounts import views
from .views import verificationView,profileDetailsView
urlpatterns=[
    path('register/', views.registerUser, name='register'),
    path('login/',views.login,name='login'),
    path('activate/<uidb64>/<token>/',verificationView.as_view(),name='activate'),
    path('profileDetails/',profileDetailsView.as_view()),
    
  
    # path('product/<str:pk',views.product,name='product')

]