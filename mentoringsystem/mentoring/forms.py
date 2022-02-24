from dataclasses import fields
from random import choice
from turtle import textinput
from mentoring.models import Profile
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm, UsernameField
from django import forms

# form for User class
class RegisterForm_user(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'password1', 'password2', 'is_active']
        labels = {'username' : 'Email'}
        help_texts= {'username':None}
        widgets = {'is_active': forms.HiddenInput()}

# form for user profile (one-to-one mapping to User class)
class RegisterForm_profile(forms.ModelForm):
    class Meta:
        model= Profile
        fields = ['business_area']

class LoginForm(AuthenticationForm):
    username = UsernameField(label='Email')