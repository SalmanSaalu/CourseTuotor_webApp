
from django.urls import path



from .views import *

urlpatterns = [
    path('pay/', start_payment, name="payment"),
    path('payment/success/', handle_payment_success, name="payment_success"),
    path('isPaid/',isPaid,name='ispaid'),
    path('premiumCourseRegister/',premiumCourseRegister,name='premiumCourseRegister'),
    path('premiumCourseBrowse/',premiumCourseBrowse,name='premiumCourseBrowse'),
    path('premiumClassEnroll/',premiumClassEnroll,name='premiumClassEnroll'),
    path('premiumCoursePaymentVerify/',verifyPremiumCoursePayment,name='premiumCoursePaymentVerify'),
    path('premiumClassEnrollProfile/',premiumClassEnrollProfile,name='premiumClassEnrollProfile'),
    path('teacherEnrolledStudents/',teacherEnrolledStudents,name='teacher-enrolled-students'),

    # path('sms/',sms,name='sms'),
    path('test/',test,name='test',)

    
]