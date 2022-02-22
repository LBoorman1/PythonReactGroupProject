from multiprocessing import AuthenticationError
from winreg import REG_RESOURCE_REQUIREMENTS_LIST
from django.shortcuts import render,redirect
from .forms import RegisterForm_profile, RegisterForm_user, LoginForm
from django.contrib.auth.views import LoginView

# Create your views here.

def home(request):
    return render(request, "users/home.html")

def register_view(request):
    #initialising form
    user_form = RegisterForm_user(request.POST)
    profile_form = RegisterForm_profile(request.POST)

    #user_form.use_required_attribute=False
    #profile_form.use_required_attribute=False

    # cleans field inputs
    user_form.clean
    profile_form.clean

    if request.method == 'POST':
        if user_form.is_valid() and profile_form.is_valid():
            # saves data
            # changes ot committed intially as extra fields are initialised first
            user_form.save(commit=False)
            user_form.is_active = True
            user_form.save()
            profile_form.save()

            return redirect('login')
    
    # combines both forms to display them as one
    context = {
        'user_form' : user_form,
        'profile_form': profile_form
    }

    return render(request, 'registration/register.html', context)

class CustomLoginView(LoginView):
    authentication_form = LoginForm