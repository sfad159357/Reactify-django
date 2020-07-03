
from django.contrib import admin
from django.urls import path, include

# path('', include('leads.urls'))要擺在第一格，才能掛api/leads上去

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('leads.urls')),

    path('admin/', admin.site.urls),
    path('', include('accounts.urls'))


]
