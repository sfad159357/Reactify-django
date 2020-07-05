from rest_framework import serializers
# django內建的User模組，裡面已經涵蓋一些認證相關的處理
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
# 我們只要進行使用knox tokens

# User Serializer (跟lead serializer很像)

# 因為沒有password fields，所以這個serializer只是用來回傳回去的在頁面上


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


# Register Serializer
# 這個是我們真正要輸入進去的serializer

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}  # 唯寫，不能讀

    # 將User app內的物件的data，去驗證符合格式的data，然後創建已註冊的user
    # validated_data是一個字典{}，值是驗證過的data
    # 注意create()方法並不屬於class Meta底下，在RegisterSerializer底下
    # 可以用DB browser去看一下auth_user所儲存的密碼，如果沒有經過雜湊的，表示只有經過post，但沒有經過create()方法
    def create(self, validated_data):
        user2 = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user2


# Login Serializer
# 這裡沒有繼承ModelSerialzer，是因為loginSerializer不需要去創建model，只需要做好validate這個user是否有認證過
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    # django內建很多預設參數和模組，所以看起來非常精簡
    def validate(self, data):
        # **的功用可以將字典{}中的key:value，展開成Func(key1=value1, key2=value2作為參數
        # authenticate()此方法，預設username和password為關鍵參數，如果驗證合格回傳User物件，若不合格回傳none
        # 到這邊我認為我們login輸入密碼123456，authenticate()會將密碼雜湊，然後比對雜湊後的結果，所以若沒有經過create()，是不會將密碼雜湊，所以比對也比對不起來
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
