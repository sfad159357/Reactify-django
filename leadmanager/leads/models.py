from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Lead(models.Model):

    name = models.CharField(max_length=100)
    email = models.EmailField(
        max_length=100, unique=True)  # unique不希望出現重複的email
    message = models.CharField(max_length=100, blank=True)  # blank訊息欄可以空白
    create_at = models.DateTimeField(auto_now_add=True)
    change_at = models.DateTimeField(auto_now=True)
    # 建立owner，擁有者model，使用外來key來連結User table也就是User model，因為不同使用者有不同的lead，每個使用者只會看到自己的leads
    # 一旦刪除user，所連結的user leads也一併刪除，關聯leads，允許null value，
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="leads", null=True)
