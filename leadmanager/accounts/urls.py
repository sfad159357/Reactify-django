from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views  # 如果knox.views排列在LoginAPI之前，會被我們客制的api複寫掉

urlpatterns = [
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth', include('knox.urls')),
    path('api/auth/logout', knox_views.LogoutView.as_view(),
         name='knox_logout')  # 登出

]
