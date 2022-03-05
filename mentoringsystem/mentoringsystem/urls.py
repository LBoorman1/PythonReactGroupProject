"""mentoringsystem URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from mentoring import views

router = routers.DefaultRouter()
#router.register(r'registerUser', views.RegisterView_User, 'registerUser')
#router.register(r'registerProfile', views.RegisterView_Profile, 'registerUser')
router.register(r'showProfile', views.showProfileView, 'showProfile')
router.register(r'menteeSignup', views.menteeSignupView, 'menteeSignup')
router.register(r'mentorSignup', views.mentorSignupView, 'mentorSignup')
router.register(r'showPotentialMentors', views.showPotentialMentorsView, 'showPotentialMentors')
router.register(r'mentorRequest', views.mentorRequestView, 'mentorRequest')
router.register(r'addRelationship', views.addRelationshipView, 'addRelationship')
router.register(r'freeTime', views.freeTimeView, 'freeTime')
router.register(r'meetingRequests', views.meetingRequestsView, 'meetingRequests')
router.register(r'meetingView', views.meetingView, 'meeting')#here for sam
router.register(r'interests', views.interestsView, 'interests')
router.register(r'expertise', views.expertiseView, 'expertise')
router.register(r'applicationFeedbackView', views.applicationFeedbackView, 'applicationFeedback')
router.register(r'businessArea', views.businessAreaView, 'businessArea')
router.register(r'businessAreaChangeRequests', views.businessAreaChangeRequestsView, 'businessAreaChangeRequests')
router.register(r'meetingFeedbackView', views.meetingFeedbackView, 'meetingFeedback')
router.register(r'POAs', views.POAsView, 'POAs')
router.register(r'showSkillInterest', views.showSkillInterestView, 'showSkillInterest')
router.register(r'groupMeetings', views.groupMeetingsView, 'groupMeetings')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    #path('login/', views.CustomLoginView.as_view(), "login"),
]

urlpatterns += router.urls
