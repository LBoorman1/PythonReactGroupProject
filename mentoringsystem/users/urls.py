from django.urls import path
from . import views

urlpatterns = [
 path('home/', views.home, name = "home"),
 path('register/', views.register_view, name="register"),
 path('login/', views.CustomLoginView.as_view(), name = "login")
]