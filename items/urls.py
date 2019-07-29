from django.urls import path
from .views import FoodItemListAPIView, FoodItemCreate

app_name = 'items'

urlpatterns = [
    path('<str:id>', FoodItemListAPIView.as_view(), name='item-list'),
    path('item/', FoodItemCreate.as_view(), name='item-create'),
]
