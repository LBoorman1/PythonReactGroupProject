from functools import reduce
from django.http import request
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
import operator
from django.db.models import Q


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

#from .forms import RegisterForm_profile, RegisterForm_user, LoginForm

# class RegisterView_User(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializerclass = UserSerializer
#     form_class = RegisterForm_user

# class RegisterView_Profile(viewsets.ModelViewSet):
#     queryset = Profile.objects.all()
#     serializerclass = ProfileSerializer
#     form_class = RegisterForm_profile

# class CustomLoginView(LoginView):
#     authentication_form = LoginForm

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

# make functions for create and show requests
class mentorRequestView(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MentorRequestSerializer(queryset, many=True)


class addRelationshipView(viewsets.ModelViewSet):
    #edit db view
    ""

#might not need function for create, remove and show
class freeTimeView(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = CalendarUserSerializer(queryset, many=True)

#make function for create and show
class meetingRequestsView(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingRequestSerializer(queryset, many=True)

#make function for create and show
class meetingView(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def list(self, request, *args, **kwargs):
        userID = request.query_params.get('userID', None)
        if userID is not None:
            #need to write the query here
            profile = Profile.objects.get(pk = userID)
            menteeAttending = MenteeAttending.objects.filter(mentee = profile)
            relationships = list(menteeAttending.values_list('relationship', flat=True))
            
            query = reduce(operator.or_, (Q(relationship=x) for x in relationships))
            result = Meeting.objects.filter(query)

            serializedData = MeetingSerializer(result, many=True)

            return Response(serializedData.data)
        else:
            return Response("no check")

#cancel meeting view skipped

#end mentoring relationship skipped

#might not need function for create, remove and show
class interestsView(viewsets.ModelViewSet):
    #return view
    queryset = Meeting.objects.all()
    serializer_class = SkillSerializer(queryset, many=True)

#delete this, not doing as someone might need this for now:
class showAllMeetingsView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()

#might not need function for create, remove and show
class expertiseView(viewsets.ModelViewSet):
    #return view
    queryset = Meeting.objects.all()
    serializer_class = SkillSerializer(queryset, many=True)

#make function for create and show
class applicationFeedbackView(viewsets.ModelViewSet):
    serializer_class = ApplicationFeedbackSerializer
    def create(self, request, *args, **kwargs):
        profile = Profile.objects.get(pk = request.data.get('userID'))
        feedback = request.data.get('feedback')
        if profile:
            #add the new object to the database
            newFeedback = ApplicationFeedback(feedback=feedback, user=profile)
            newFeedback.save()
            return Response("Successfully added feedback to database")
        else:
            #return an error to the frontend
            return Response("No profile coresponding to that userID")


 
    ""

class addBusinessAreaView(viewsets.ModelViewSet):
    #edit db view
    ""
#make function for create and show
class businessAreaChangeRequestsView(viewsets.ModelViewSet):
    #edit db view
    ""
#make function for create and show
class businessAreaView(viewsets.ModelViewSet):
    #edit db view
    ""
    
#remove user skipped

#make function for create and show
class meetingFeedbackView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

#make function for create and show
class POAsView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

#show interest for some skill
class showSkillInterestView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

#make function for create and show
class groupMeetingsView(viewsets.ModelViewSet):
    #return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

#cancel attendance skipped

