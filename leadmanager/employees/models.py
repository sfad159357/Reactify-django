from django.db import models

# Create your models here.


class Employee(models.Model):
    SEX = (
        ('M', '男'),
        ('F', '女'),
    )
    employee_id = models.CharField(max_length=10)
    name = models.CharField(max_length=10)
    gender = models.CharField(max_length=1, choices=SEX)
    mobile = models.CharField(max_length=10)
    create_at = models.DateTimeField(auto_now_add=True)
    change_at = models.DateTimeField(add_now=True)
