from django.urls import re_path, path
from .consumers import ChatConsumer


websocket_urlpatterns = [
    path('ws/chat/<str:shop_id>', ChatConsumer, name='chat-room'),
]