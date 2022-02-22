from dataclasses import fields
from mentoring.models import Profile
from django.contrib.auth.models import User
from django import forms

# form for User class
class RegisterForm_user(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

# form for user profile (one-to-one mapping to User class)
class RegisterForm_profile(forms.ModelForm):
    class Meta:
        model= Profile
        fields = ['business_area']