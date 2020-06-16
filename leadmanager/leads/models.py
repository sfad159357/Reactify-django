from django.db import models

# Create your models here.
class Lead(models.Model):
    
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True) # unique不希望出現重複的email
    message = models.CharField(max_length=100, blank=True) # blank訊息欄可以空白 
    create_at = models.DateTimeField(auto_now_add=True) # 紀錄創建時間