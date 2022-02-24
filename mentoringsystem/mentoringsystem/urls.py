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
router.register(r'registerUser', views.RegisterView_User, 'registerUser')
router.register(r'registerProfile', views.RegisterView_Profile, 'registerUser')
router.register(r'showProfile', views.showProfileView, 'showProfile')
router.register(r'menteeSignup', views.menteeSignupView, 'menteeSignup')
router.register(r'mentorSignup', views.mentorSignupView, 'mentorSignup')
router.register(r'showPotentialMentors', views.showPotentialMentorsView, 'showPotentialMentors')
router.register(r'requestMentor', views.requestMentorView, 'requestMentor')
router.register(r'showMentoringRequests', views.showMentoringRequestsView, 'showMentoringRequests')
router.register(r'addRelationship', views.addRelationshipView, 'addRelationship')
router.register(r'addFreeTime', views.addFreeTimeView, 'addFreeTime')
router.register(r'showFreehours', views.showFreehoursView, 'showFreehours')
router.register(r'requestMeetings', views.requestMeetingsView, 'requestMeetings')
router.register(r'showMeetingRequests', views.showMeetingRequestsView, 'showMeetingRequests')
router.register(r'createMeeting', views.createMeetingView, 'createMeeting')
router.register(r'showMeetings', views.showMeetingsView, 'showMeetings')
router.register(r'showInterests', views.showInterestsView, 'showInterests')
router.register(r'addInterest', views.addInterestView, 'addInterest')
router.register(r'removeInterest', views.removeInterestView, 'removeInterest')
router.register(r'showExpertise', views.showExpertiseView, 'showExpertise')
router.register(r'addExpertise', views.addExpertiseView, 'addExpertise')
router.register(r'removeExpertise', views.removeExpertiseView, 'removeExpertise') 
router.register(r'showSystemFeedback', views.showSystemFeedbackView, 'showSystemFeedback')
router.register(r'addSystemFeedback', views.addSystemFeedbackView, 'addSystemFeedback')
router.register(r'addBusinessArea', views.addBusinessAreaView, 'addBusinessArea')
router.register(r'businessAreaChangeRequests', views.businessAreaChangeRequestsView, 'businessAreaChangeRequests')
router.register(r'changeBusinessArea', views.changeBusinessAreaView, 'changeBusinessArea')
router.register(r'showMeetingFeedback', views.showMeetingFeedbackView, 'showMeetingFeedback')
router.register(r'addMeetingFeedback', views.addMeetingFeedbackView, 'addMeetingFeedback')
router.register(r'showPOAs', views.showPOAsView, 'showPOAs')
router.register(r'addPOA', views.addPOAView, 'addPOA')
router.register(r'showSkillInterest', views.showSkillInterestView, 'showSkillInterest')
router.register(r'addGroupSession', views.addGroupSessionView, 'addGroupSession')
router.register(r'showGroupMeetings', views.showGroupMeetingsView, 'showGroupMeetings')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('login/', views.CustomLoginView.as_view(), "login"),
]

urlpatterns += router.urls
