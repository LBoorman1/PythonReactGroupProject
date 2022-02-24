from django.shortcuts import render
from rest_framework import viewsets

from django.contrib.auth.models import User
from mentoring.models import Profile 
from mentoring.models import ApplicationFeedback
from mentoring.models import Skill
from mentoring.models import MentorSkill
from mentoring.models import MenteeInterest
from mentoring.models import MentorRequest
from mentoring.models import Relationship
from mentoring.models import MenteeAttending
from mentoring.models import BecomeMentor
from mentoring.models import BusinessArea
from mentoring.models import BusinessAreaChangeRequest
from mentoring.models import CalendarUser
from mentoring.models import Meeting
from mentoring.models import MeetingRequest
from mentoring.models import MeetingFeedback
from mentoring.models import PlanOfAction
from mentoring.models import POATarget

from mentoring.serializers import UserSerializer
from mentoring.serializers import ProfileSerializer
from mentoring.serializers import ApplicationFeedbackSerializer
from mentoring.serializers import SkillSerializer
from mentoring.serializers import MentorSkillSerializer
from mentoring.serializers import MenteeInterestSerializer
from mentoring.serializers import MentorRequestSerializer
from mentoring.serializers import RelationshipSerializer
from mentoring.serializers import MenteeAttendingSerializer
from mentoring.serializers import BecomeMentorSerializer
from mentoring.serializers import BusinessAreaSerializer
from mentoring.serializers import BusinessAreaChangeRequestSerializer
from mentoring.serializers import CalendarUserSerializer
from mentoring.serializers import MeetingSerializer
from mentoring.serializers import MeetingRequestSerializer
from mentoring.serializers import MeetingFeedbackSerializer
from mentoring.serializers import PlanOfActionSerializer
from mentoring.serializers import POATargetSerializer

from django.contrib.auth.views import LoginView

from .forms import RegisterForm_profile, RegisterForm_user, LoginForm

class RegisterView_User(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializerclass = UserSerializer
    form_class = RegisterForm_user

class RegisterView_Profile(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializerclass = ProfileSerializer
    form_class = RegisterForm_profile

class CustomLoginView(LoginView):
    authentication_form = LoginForm

class showProfileView(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = ProfileSerializer(queryset, many=True)

class menteeSignupView(viewsets.ModelViewSet):
    #edit db view
    ""

class mentorSignupView(viewsets.ModelViewSet):
    #edit db view
    ""

#Verify mentor - Skipped

class showPotentialMentorsView(viewsets.ModelViewSet):
    #return view
    queryset = Meeting.objects.all()
    serializer_class = ProfileSerializer(queryset, many=True)

class requestMentorView(viewsets.ModelViewSet):
    #edit db view
    ""

class showMentoringRequestsView(viewsets.ModelViewSet):
    #return view
    queryset = Meeting.objects.all()
    serializer_class = MentorRequestSerializer(queryset, many=True)

class addRelationshipView(viewsets.ModelViewSet):
    #edit db view
    ""

class addFreeTimeView(viewsets.ModelViewSet):
    #edit db view
    ""

# remove freeTime skipped

class showFreehoursView(viewsets.ModelViewSet):
    #return view
    queryset = Meeting.objects.all()
    serializer_class = CalendarUserSerializer(queryset, many=True)

class requestMeetingsView(viewsets.ModelViewSet):
    #edit db view
    ""

class showMeetingRequestsView(viewsets.ModelViewSet):
    #return view
    queryset = Meeting.objects.all()
    serializer_class = MeetingRequestSerializer(queryset, many=True)

class createMeetingView(viewsets.ModelViewSet):
    #edit db view
    ""

class showMeetingsView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

#cancel meeting view skipped

#end mentoring relationship skipped

class showInterestsView(viewsets.ModelViewSet):
    #return view
    queryset = Meeting.objects.all()
    serializer_class = SkillSerializer(queryset, many=True)


class addInterestView(viewsets.ModelViewSet):
    #edit db view
    ""

class removeInterestView(viewsets.ModelViewSet):
    #edit db view
    ""

class showExpertiseView(viewsets.ModelViewSet):
    #return view
    queryset = Meeting.objects.all()
    serializer_class = SkillSerializer(queryset, many=True)

class addExpertiseView(viewsets.ModelViewSet):
    #edit db view
    ""

class removeExpertiseView(viewsets.ModelViewSet):
    #edit db view
    ""

class showSystemFeedbackView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

class addSystemFeedbackView(viewsets.ModelViewSet):
    #edit db view
    ""

class addBusinessAreaView(viewsets.ModelViewSet):
    #edit db view
    ""

class businessAreaChangeRequestsView(viewsets.ModelViewSet):
    #edit db view
    ""

class changeBusinessAreaView(viewsets.ModelViewSet):
    #edit db view
    ""

#remove user skipped

class showMeetingFeedbackView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

class addMeetingFeedbackView(viewsets.ModelViewSet):
    #edit db view
    ""

class showPOAsView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

class addPOAView(viewsets.ModelViewSet):
    #edit db view
    ""

class showSkillInterestView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

class addGroupSessionView(viewsets.ModelViewSet):
    #edit db view
    ""

class showGroupMeetingsView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

#cancel attendance skipped