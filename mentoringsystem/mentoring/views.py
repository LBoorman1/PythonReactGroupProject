from django.shortcuts import render
from rest_framework import viewsets

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

class ProfileView(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = ProfileSerializer(queryset, many=True)

class MenteeSignupView(viewsets.ModelViewSet):
    #edit db view
    ""

class MentorSignupView(viewsets.ModelViewSet):
    #edit db view
    ""

#Verify mentor - Skipped

class PotentialMentorsView(viewsets.ModelViewSet):
    #return view
    queryset = Meeting.objects.all()
    serializer_class = ProfileSerializer(queryset, many=True)

class RequestMentorView(viewsets.ModelViewSet):
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

class requestMeetingView(viewsets.ModelViewSet):
    #edit db view
    ""

class showMeetingRequestsView(viewsets.ModelViewSet):
    #return view
    queryset = Meeting.objects.all()
    serializer_class = MeetingRequestSerializer(queryset, many=True)

class createMeetingView(viewsets.ModelViewSet):
    #edit db view
    ""

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

class showSystemFeedbackView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

class addSystemFeedbackView(viewsets.ModelViewSet):
    #edit db view
    ""