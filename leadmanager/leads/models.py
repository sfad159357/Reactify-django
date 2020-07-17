from django.db import models
from django.contrib.auth.models import User


class Lead(models.Model):

    name = models.CharField(max_length=100)
    email = models.EmailField(
        max_length=100, unique=True)
    message = models.CharField(max_length=100, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    change_at = models.DateTimeField(auto_now=True)

    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="leads", null=True)
