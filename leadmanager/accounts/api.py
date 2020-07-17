from rest_framework import generics, permissions, serializers

from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
import django.contrib.auth.password_validation as validators
from django.core import exceptions


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        userV = serializer.validated_data
        passwordV = request.data.get('password')
        errors = dict()
        try:
            validators.validate_password(password=passwordV, user=userV)
        except exceptions.ValidationError as VE:
            errors['password'] = [VE.messages][0]

        if errors:
            raise serializers.ValidationError(errors)
        else:
            user1 = serializer.save()

        _, token = AuthToken.objects.create(user1)

        return Response({

            "user": UserSerializer(user1, context=self.get_serializer_context()).data,

            "token": token
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)

        return Response({
            "user": UserSerializer(user, ).data,
            "token": token
        })


class UserAPI(generics.RetrieveAPIView):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
