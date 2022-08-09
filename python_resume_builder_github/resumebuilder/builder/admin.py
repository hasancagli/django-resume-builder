from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Resume)
admin.site.register(Skill)
admin.site.register(Hobby)
admin.site.register(Experience)
admin.site.register(Education)