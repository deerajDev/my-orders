from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, CreateAPIView, ListAPIView
from .models import Item
from .serializers import FoodItemSerializer


class FoodItemListAPIView(ListAPIView):
    serializer_class = FoodItemSerializer

    def get_queryset(self):
        try:
            shop_id = self.kwargs.get('id', None)
            qs = Item.objects.filter(shop_id=shop_id)
            return qs
        except Exception as e:
            raise serializers.ValidationError('Provide valid shop ID')


class FoodItemCreate(CreateAPIView):
    serializer_class = FoodItemSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            item = serializer.create(serializer.validated_data)
            return Response({
                'id': item.id,
                'name': item.name,
                'cost': item.cost
            })
        except Exception as e:
            raise serializers.ValidationError(
                'Data already exist or shop id is wrong..')
