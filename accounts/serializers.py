from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Shop
import secrets


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create(**validated_data)


class ShopSerializer(serializers.ModelSerializer):
    owner = UserSerializer()

    class Meta:
        model = Shop
        fields = ['owner', 'shop_name']

    def create(self, validated_data):
        user_info = validated_data.pop('owner')
        user = User.objects.create_user(**user_info)
        validated_data['shop_id'] = secrets.token_hex(4)
        new_shop = Shop.objects.create(owner=user, **validated_data)
        return new_shop


class LoginOwnerSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    # method for validating the user
    def validate(self, data):
        print(data)
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')


class LoginStaffSerializer(serializers.Serializer):
    shop_name = serializers.CharField(required=True)
    shop_id = serializers.CharField(required=True)

    def validate(self, qs):
        print(qs)
        if len(qs) > 0:
            return True
        else:
            return False
