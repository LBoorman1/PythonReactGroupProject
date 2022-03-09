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
from django.urls import re_path, path, include
from rest_framework import routers
from mentoring import views

router = routers.DefaultRouter()
router.register(r'register', views.RegisterView, 'register')
router.register(r'showProfile', views.showProfileView, 'showProfile')
router.register(r'menteeSignup', views.menteeSignupView, 'menteeSignup')
router.register(r'mentorSignup', views.mentorSignupView, 'mentorSignup')
router.register(r'potentialmentors', views.PotentialMentorsView, 'potentialmentors')
#router.register(r'mentorRequest', views.mentorRequestView, 'mentorRequest')
router.register(r'addRelationship', views.addRelationshipView, 'addRelationship')
#router.register(r'addFreeTime', views.addFreeTimeView, 'addFreeTime')
#router.register(r'showFreehours', views.showFreehoursView, 'showFreehours')
#router.register(r'showMeetingRequests', views.showMeetingRequestsView, 'showMeetingRequests')
#router.register(r'createMeeting', views.createMeetingView, 'createMeeting')
#router.register(r'showMeetings', views.showMeetingsView, 'showMeetings')
#router.register(r'showInterests', views.showInterestsView, 'showInterests')
#router.register(r'addInterest', views.addInterestView, 'addInterest')
#router.register(r'removeInterest', views.removeInterestView, 'removeInterest')
#router.register(r'showExpertise', views.showExpertiseView, 'showExpertise')
#router.register(r'meetingRequests', views.meetingRequestsView, 'meetingRequests')
#router.register(r'meetingView', views.meetingView, 'meeting')
#router.register(r'addGroupSession', views.addGroupSessionView, 'addGroupSession')
#router.register(r'showGroupMeetings', views.showGroupMeetingsView, 'showGroupMeetings')
router.register(r'addExpertise', views.addExpertiseView, 'addExpertise')
router.register(r'removeExpertise', views.removeExpertiseView, 'removeExpertise') 
router.register(r'freehours', views.FreeHoursView, 'freehours')
router.register(r'interests', views.interestsView, 'interests')
router.register(r'expertise', views.expertiseView, 'expertise')
router.register(r'applicationFeedbackView', views.applicationFeedbackView, 'applicationFeedback')
router.register(r'meetingFeedbackView', views.meetingFeedbackView, 'meetingFeedback')
router.register(r'POA', views.POAView, 'POA')
router.register(r'POATargetCreate', views.POATargetCreateView, 'POATargetCreate')
router.register(r'POATargetUpdate', views.POATargetUpdateView, 'POATargetUpdate')
router.register(r'menteeOptions', views.menteeOptionsView, 'menteeOptions')
router.register(r'showSkillInterest', views.showSkillInterestView, 'showSkillInterest')
router.register(r'groupMeetings', views.groupMeetingsView, 'groupMeetings')
router.register(r'showSystemFeedback', views.showSystemFeedbackView, 'showSystemFeedback')
router.register(r'addSystemFeedback', views.addSystemFeedbackView, 'addSystemFeedback')
router.register(r'businessareachangerequests', views.BusinessAreaChangeRequestUserView, 'businessareachangerequests')
router.register(r'becomementors', views.BecomeMentorUserView, 'becomementors')
router.register(r'skills', views.SkillView, 'skills')
router.register(r'businessareas', views.BusinessAreaView, 'businessareas')
router.register(r'allapplicationfeedback', views.AllApplicationFeedbackView, 'allapplicationfeedback')
router.register(r'meetings', views.MeetingView, 'meetings') 

# Here we must also add the non-class based views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('toggleadmin/<int:pk>/', views.toggle_admin),
    path('toggleactive/<int:pk>/', views.toggle_active),
    path('setmentor/<int:pk>/', views.set_mentor),
    path('removetopicsofexpertise/<int:pk>/', views.remove_topics_of_expertise),
    path('setbusinessarea/<int:pk>/', views.set_business_area),
    path('checkoffbecomementor/<int:pk>/', views.check_off_become_mentor),
    path('checkoffbusinessareachangerequest/<int:pk>/', views.check_off_business_area_change_request),
    path('getmenteerelationship/', views.get_mentee_relationship),
    re_path('searchuser/', views.search_user),
    #path('account/',include('users.urls')),
    path('account/', include('django.contrib.auth.urls')),
    path('login/', views.LoginView.as_view(), name="login"),
    path('logout/', views.LogoutView.as_view(), name="logout")
]

urlpatterns += router.urls
