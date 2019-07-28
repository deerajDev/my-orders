from django.urls import path
from .views import (ShopRegisterAPIView,
                    LoginOwnerAPIView,
                    LoginStaffAPIView,
                    )



app_name = 'accounts'
urlpatterns = [
    path('register', ShopRegisterAPIView.as_view(), name='register-shop'),
    path('login/owner', LoginOwnerAPIView.as_view(), name='login-owner'),
    path('login/staff', LoginStaffAPIView.as_view(), name='login-staff'),
]
