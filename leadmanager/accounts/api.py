from rest_framework import generics, permissions
# 我們需要從api傳送response
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # 可以傳回任何所需要的error
        user1 = serializer.save()  # save user到database，這就是register動作
        # 會回傳 tuple (instance, token)，前面用兩個變數來儲存，就會回傳兩個值，而不是直接回傳一個tuple，值1就用_取代，儲存值2=token
        _, token = AuthToken.objects.create(user1)

        # 一旦post後，在postman底下得到回傳的資訊，這個就是來自於這裡的API
        return Response({
            # serialized user
            "user": UserSerializer(user1, context=self.get_serializer_context()).data,
            # 為指定user創造屬於他的token，當從前端做request，將會透過token來知道你是誰，然後這token將會進入到header，在header內進入到authorization授權
            "token": token
        })


# Login API
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


# Get User API
class UserAPI(generics.RetrieveAPIView):
    # 設定要有token才能夠存取User
    permission_classes = [
        permissions.IsAuthenticated,  # 若只有單一值後面要多加,。
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
