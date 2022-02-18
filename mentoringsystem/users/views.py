from django.shortcuts import render,redirect
from .forms import RegisterForm_profile, RegisterForm_user

# Create your views here.

def home(request):
    return render(request, "users/home.html")

def register_view(request):
    user_form = RegisterForm_user(request.POST)
    profile_form = RegisterForm_profile(request.POST)

    if request.method == 'POST':
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()

            return redirect('login')
    
    context = {
        'user_form' : user_form,
        'profile_form': profile_form
    }

    return render(request, 'registration/register.html', context)
