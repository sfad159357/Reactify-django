from django.db import models
from django.contrib.auth.models import User


class Lead(models.Model):

    SEX = (
        ('男', '男'),
        ('女', '女'),
    )
    name = models.CharField(max_length=20)
    gender = models.CharField(max_length=1, choices=SEX, null=True)
    birth = models.DateField(null=True)
    mobile = models.CharField(
        max_length=10, blank=True, null=True)
    email = models.EmailField(max_length=30, blank=True, unique=True)

    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='leads', null=True)
    join_date = models.DateField(null=True)
    create_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    change_at = models.DateTimeField(auto_now=True, blank=True)
