from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Employee(models.Model):
    SEX = (
        ('M', '男'),
        ('F', '女'),
    )
    employee_id = models.CharField(max_length=20)
    name = models.CharField(max_length=20)
    gender = models.CharField(max_length=1, choices=SEX)
    mobile = models.CharField(max_length=10, default=0)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='employees', null=True)
    create_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    change_at = models.DateTimeField(auto_now=True, blank=True)
