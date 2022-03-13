from django.contrib import admin, auth
from django.urls import re_path, path, include
from rest_framework import routers
from mentoring import views

router = routers.DefaultRouter()
router.register(r'register', views.RegisterView, 'register')
router.register(r'showProfile', views.showProfileView, 'showProfile')
router.register(r'possiblementors', views.PotentialMentorsView, 'possiblementors')
router.register(r'freehours', views.FreeHoursView, 'freehours')
router.register(r'applicationFeedbackView', views.applicationFeedbackView, 'applicationFeedback')
router.register(r'meetingFeedbackView', views.meetingFeedbackView, 'meetingFeedback')
router.register(r'POA', views.POAView, 'POA')
router.register(r'POATargetCreate', views.POATargetCreateView, 'POATargetCreate')
router.register(r'POATargetUpdate', views.POATargetUpdateView, 'POATargetUpdate')
router.register(r'menteeOptions', views.menteeOptionsView, 'menteeOptions')
router.register(r'businessareachangerequests', views.BusinessAreaChangeRequestUserView, 'businessareachangerequests')
router.register(r'becomementors', views.BecomeMentorUserView, 'becomementors')
router.register(r'mentorrequests', views.MentorRequestUserView, 'mentorrequests') 
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
    path('menteerelationship/', views.get_mentee_relationship),
    path('userdetails/', views.get_user_details),
    path('mentormentees/', views.get_mentor_mentees),
    path('menteementor/', views.get_mentee_mentor),
    path('addmentoringrelationship/', views.add_mentoring_relationship), 
    path('endmentoringrelationship/', views.end_mentoring_relationship),
    path('mentorrequestsbymentee/', views.get_mentee_mentor_requests), 
    path('freehoursbymentor/', views.get_free_hours_by_mentor),
    path('searchuser/', views.search_user),
    path('account/', include('django.contrib.auth.urls')),
    path('login/', views.LoginView.as_view(), name="login"),
    path('logout/', views.LogoutView.as_view(), name="logout"),
    path('menteesignup/', views.mentee_signup),
    path('mentorsignup/', views.mentor_signup)
]

urlpatterns += router.urls
