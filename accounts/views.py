from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, CreateAPIView, ListAPIView
from .models import Shop


from .serializers import (UserSerializer,
                          ShopSerializer,
                          LoginOwnerSerializer,
                          LoginStaffSerializer,)
                        


class ShopRegisterAPIView(GenericAPIView):
    serializer_class = ShopSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        email = request.data['owner.email']
        password = request.data['owner.password']
        shop_name = request.data['shop_name']
        data = {'owner': {'email': email, 'password': password},
                'shop_name': shop_name}
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        shop = serializer.create(serializer.validated_data)
        return Response({
            "shop": {
                "shop_id": shop.shop_id,
                "shop_name": shop.shop_name
            }
        })


class LoginOwnerAPIView(GenericAPIView):
    serializer_class = LoginOwnerSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            shop = Shop.objects.filter(owner__email=request.data['email'])[0]

            return Response({
                'shop': {
                    'shop_name': shop.shop_name,
                    'shop_id': shop.shop_id
                }
            })
        except Exception as e:
            return Response('Your are not the owner of any shop please register your shop')


class LoginStaffAPIView(GenericAPIView):
    serializer_class = LoginStaffSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        data = request.data

        serializer = self.get_serializer(data=data)
        if (serializer.validate(self.get_queryset())):
            return Response('authentication was successful')
        else:
            raise serializers.ValidationError('Incorrect shop name or shop ID')

    def get_queryset(self):
        shop_name = self.request.data['shop_name']
        shop_id = self.request.data['shop_id']
        print(shop_id, shop_name)
        print('above is from get_queryset method')
        qs = Shop.objects.filter(shop_name=shop_name, shop_id=shop_id)
        return qs








