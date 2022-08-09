from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Resume(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True)
    surname = models.CharField(max_length=255, null=True)
    phoneNumber = models.CharField(max_length=255, null=True)
    email = models.CharField(max_length=255, null=True)
    title = models.CharField(max_length=255, null=True)
    location = models.CharField(max_length=255, null=True)
    introduce = models.CharField(max_length=2000, null=True)
    profile_pic = models.ImageField(default="/profile.jpg", null=True, blank=True)
    
    

class Education(models.Model):
    resume = models.ForeignKey(Resume, null=True, on_delete=models.CASCADE)
    description = models.CharField(max_length=255, null=True)


class Skill(models.Model):
    resume = models.ForeignKey(Resume, null=True, on_delete=models.CASCADE)
    description = models.CharField(max_length=255, null=True)

class Hobby(models.Model):
    resume = models.ForeignKey(Resume, null=True, on_delete=models.CASCADE)
    description = models.CharField(max_length=255, null=True) 
    
class Experience(models.Model):
    resume = models.ForeignKey(Resume, null=True, on_delete=models.CASCADE)
    startDate = models.CharField(max_length=255, null=True)
    endDate = models.CharField(max_length=255, null=True)
    company = models.CharField(max_length=255, null=True)
    title = models.CharField(max_length=255, null=True)
    description = models.CharField(max_length=2000, null=True)