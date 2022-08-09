from django.contrib import admin
from django.urls import path

from . import views 

urlpatterns = [
    path('', views.index, name="index"),
    path('register/', views.registerPage, name="register"),
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    
    path('createEducation/', views.createEducation, name="createEducation"),
    path('delete/<str:pk>', views.deleteEducation, name="deleteEducation"),
    
    path('createSkill/', views.createSkill, name="createSkill"),
    path('deleteSkill/<str:pk>', views.deleteSkill, name="deleteSkill"),
    
    path('createHobby/', views.createHobby, name="createHobby"),
    path('deleteHobby/<str:pk>', views.deleteHobby, name="deleteHobby"),
    
    path('createExperience/', views.createExperience, name="createExperience"),
    path('deleteExperience/<str:pk>', views.deleteExperience, name="deleteExperience"),
    
    path('updateInfos/', views.updateInfos, name="updateInfos"),
    
    path('pdf_view/', views.ViewPDF.as_view(), name="pdf_view"),
]