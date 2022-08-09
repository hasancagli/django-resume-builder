import json
from unittest import expectedFailure
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from .forms import CreateUserForm
from django.contrib.auth.models import User

from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from django.views import View
from xhtml2pdf import pisa

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from django.contrib import messages

from .models import *
from .forms import ImageForm
from django.http import JsonResponse

# Create your views here.

def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
    if not pdf.err:
	    return HttpResponse(result.getvalue(), content_type='application/pdf')

#Opens up page as PDF
class ViewPDF(View):
    
    def get(self, request, *args, **kwargs):
        data = {}
        resume = Resume.objects.get(user=request.user)
        
        try:
            educations = list(Education.objects.filter(resume=resume).values())
            data['educations'] = educations
            
            skills = list(Skill.objects.filter(resume=resume).values())
            data['skills'] =skills
            
            hobbys = list(Hobby.objects.filter(resume=resume).values())
            data['hobbys'] =hobbys
            
            experiences = list(Experience.objects.filter(resume=resume).values())
            data['experiences'] =experiences
            
            resume = Resume.objects.get(user=request.user)
            returnObject = {
                'name': resume.name,
                'surname': resume.surname,
                'phoneNumber': resume.phoneNumber,
                'email': resume.email,
                'title': resume.title,
                'location': resume.location,
                'introduce': resume.introduce,
                'profile_pic': resume.profile_pic.url, 
            }
            
            data['resume'] = returnObject
            
        except: 
            pass
        pdf = render_to_pdf('builder/resume_template.html', data)
        return HttpResponse(pdf, content_type="application/pdf")
    

@login_required(login_url='login')
def index(request):
    
    context = {}
    resume = Resume.objects.get(user=request.user)
    
    if (request.method == "POST"):
        form = ImageForm(request.POST, request.FILES, instance=resume)
        if form.is_valid():
            form.save()
    
    
    context['resume'] =resume
    
    form = ImageForm(instance=resume)
    context['form'] = form
    try:
        educations = list(Education.objects.filter(resume=resume).values())
        context['educations'] = educations
        
        skills = list(Skill.objects.filter(resume=resume).values())
        context['skills'] =skills
        
        hobbys = list(Hobby.objects.filter(resume=resume).values())
        context['hobbys'] =hobbys
        
        experiences = list(Experience.objects.filter(resume=resume).values())
        context['experiences'] =experiences
    except:
        pass
    
    return render(request, 'builder/index.html', context)

def registerPage(request):
    if request.user.is_authenticated:
        return redirect('index')
    else:
        form = CreateUserForm()

        if request.method == "POST":
            form = CreateUserForm(request.POST)
            if form.is_valid():
                form.save()
                user = form.cleaned_data.get('username')
                messages.success(request, 'Account was created for ' + user)
                return redirect('login')

        context = {'form': form}
        return render(request, 'builder/register.html', context)

def loginPage(request):
    if request.user.is_authenticated:
        return redirect('index')
    else:
        if (request.method == "POST"):
            username = request.POST.get('username')
            password = request.POST.get('password')
            
            user = authenticate(request, username=username, password=password )
            
            if user is not None:
                login(request, user)
                try:
                    resume = Resume.objects.get(user=request.user)
                except:
                    resume = Resume(user=request.user, name="", surname="", title="",phoneNumber="", email="", location="", introduce="")
                    resume.save()
                    
                return redirect('index')
            else:
                messages.info(request, 'Username or Password is incorrect') 

        context = {}
        return render(request, 'builder/login.html', context)

@login_required(login_url='login')
def logoutUser(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')    
def createEducation(request):
    desc = json.load(request)['desc']
    if request.method == "POST":
        if (len(desc) < 1):
            return JsonResponse({'message': 'error', "messages" : ["Please Give Education Info to Add"]})
        else:
            try:
                resume = Resume.objects.get(user=request.user)
                education = Education(resume=resume, description=desc)
                education.save()
                
                returnObject = {
                    "desc": education.description,
                    "id": education.id
                }
                
                return JsonResponse({'message': 'success', "data" : returnObject})
            except:
                return JsonResponse({'message': 'error', "messages" : ['An error happened!']})
            
    return JsonResponse({'message': 'error'})

@login_required(login_url='login')
def deleteEducation(request, pk):
    resume = Resume.objects.get(user=request.user)
    if request.method == "POST":
        try:
            education = Education.objects.get(id=pk)
            education.delete()
            
            educations = list(Education.objects.filter(resume=resume).values())
            
            return JsonResponse({'message': 'success',"educations": educations})
        except:
            return JsonResponse({'message': 'error'})
        
    return JsonResponse({'message': 'error'})

@login_required(login_url='login')
def createSkill(request):
    skill = json.load(request)['skill']
    if request.method == "POST":
        if (len(skill) < 1):
            return JsonResponse({'message': 'error', "messages" : ["Please Give Skill Info to Add"]})
        else:
            try:
                resume = Resume.objects.get(user=request.user)
                skill = Skill(resume=resume, description=skill)
                skill.save()
                
                returnObject = {
                    "skill": skill.description,
                    "id": skill.id
                }
                
                return JsonResponse({'message': 'success', "data" : returnObject})
            except:
                return JsonResponse({'message': 'error', "messages" : ['An error happened!']})
            
    return JsonResponse({'message': 'error'})

@login_required(login_url='login')
def deleteSkill(request, pk):
    resume = Resume.objects.get(user=request.user)
    if request.method == "POST":
        try:
            skill = Skill.objects.get(id=pk)
            skill.delete()
            
            skills = list(Skill.objects.filter(resume=resume).values())
            
            return JsonResponse({'message': 'success',"skills": skills})
        except:
            return JsonResponse({'message': 'error'})
        
    return JsonResponse({'message': 'error'})

@login_required(login_url='login')
def createHobby(request):
    desc = json.load(request)['desc']
    if request.method == "POST":
        if (len(desc) < 1):
            return JsonResponse({'message': 'error', "messages" : ["Please Give Hobby Info to Add"]})
        else:
            try:
                resume = Resume.objects.get(user=request.user)
                hobby = Hobby(resume=resume, description=desc)
                hobby.save()
                
                returnObject = {
                    "desc": hobby.description,
                    "id": hobby.id
                }
                
                return JsonResponse({'message': 'success', "data" : returnObject})
            except:
                return JsonResponse({'message': 'error', "messages" : ['An error happened!']})

@login_required(login_url='login')        
def deleteHobby(request, pk):
    resume = Resume.objects.get(user=request.user)
    if request.method == "POST":
        try:
            hobby = Hobby.objects.get(id=pk)
            hobby.delete()
            
            hobbys = list(Hobby.objects.filter(resume=resume).values())
            
            return JsonResponse({'message': 'success',"hobbys": hobbys})
        except:
            return JsonResponse({'message': 'error'})
        
    return JsonResponse({'message': 'error'})

@login_required(login_url='login')
def createExperience(request):
    
    data = json.load(request)
    
    start = data['start']
    end = data['end']
    company =data['company']
    title = data['title']
    desc = data['description']
    
    
    
    if request.method == "POST":
        if (len(desc) < 1 or len(title) < 1 or len(company) <1 or len(end) <1 or len(start) <1):
            
            return JsonResponse({'message': 'error', "messages" : ["Please Fill all the Fields"]})
        else:
            try:
                resume = Resume.objects.get(user=request.user)
                experience = Experience(resume=resume, startDate=start, endDate = end, title= title, company=company,description=desc)
                experience.save()
                
                returnObject = {
                    "start": experience.startDate,
                    "end": experience.endDate,
                    "title": experience.title,
                    "company": experience.company,
                    "desc": experience.description,
                    "id": experience.id
                }
                
                return JsonResponse({'message': 'success', "data" : returnObject})
            except:
                return JsonResponse({'message': 'error', "messages" : ['An error happened!']})
@login_required(login_url='login')           
def deleteExperience(request, pk):
    resume = Resume.objects.get(user=request.user)
    if request.method == "POST":
        try:
            experience = Experience.objects.get(id=pk)
            experience.delete()
            
            experiences = list(Experience.objects.filter(resume=resume).values())
            
            return JsonResponse({'message': 'success',"experiences": experiences})
        except:
            return JsonResponse({'message': 'error'})
        
    return JsonResponse({'message': 'error'})

@login_required(login_url='login')
def updateInfos(request):
    
    data = json.load(request)

    name = data['name']
    surname = data['surname']
    phoneNumber = data['phoneNumber']
    email = data['email']
    title = data['title']
    location = data['location']
    introduce = data['introduce']
    
    if request.method == "POST":
        try:
            Resume.objects.filter(user=request.user).update(name=name, surname=surname, phoneNumber=phoneNumber, email=email, title=title, location=location, introduce=introduce)
            resume = Resume.objects.get(user=request.user)
            returnObject = {
                'name': resume.name,
                'surname': resume.surname,
                'phoneNumber': resume.phoneNumber,
                'email': resume.email,
                'title': resume.title,
                'location': resume.location,
                'introduce': resume.introduce
            }
            
            return JsonResponse({'message': 'success',"data": returnObject})
        except:
            return JsonResponse({'message': 'error',"messages": ['An Error Happened!']})