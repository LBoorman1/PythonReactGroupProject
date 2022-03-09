import re
from django.http import request
from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout
from functools import reduce
import profile
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
from mentoring.serializers import RegisterUserSerializer
from mentoring.serializers import RegisterProfileSerializer
from mentoring.serializers import LoginSerializer
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

class RegisterView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = RegisterProfileSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user_profile=serializer.save()
        return Response({
            "user" : ProfileSerializer(user_profile).data,
            "token" : Token.objects.create(user=user_profile.user).key
        })

class LoginView(generics.GenericAPIView):
        serializer_class = LoginSerializer

        def post(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data
            login(request, user)
            return Response({
                "user": ProfileSerializer(Profile.objects.get(user=user)).data,
                "token": Token.objects.create(user=user).key
            })
            
class LogoutView(APIView):
    
    def post(self, request, *args, **kwargs):
        Token.objects.filter(user=request.data["user"]["id"]).delete()
        logout(request)
        return Response({"message":"Logout Successful"})

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
            profile = Profile.objects.get(user = userID)
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
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer
    def create(self, request, *args, **kwargs):
        profile = Profile.objects.get(user = request.data.get('userID'))
        feedback = request.data.get('feedback')
        if profile:
            #add the new object to the database
            newFeedback = ApplicationFeedback(feedback=feedback, user=profile)
            newFeedback.save()
            return Response("Successfully added feedback to database")
        else:
            #return an error to the frontend
            return Response("No profile coresponding to that userID")

    def list(self, request, *args, **kwargs):
        userID = request.query_params.get('userID', None)
        if userID is not None:
            #need to write the query here
            profile = Profile.objects.get(user = userID)
            appFeedback = ApplicationFeedback.objects.filter(user=profile)

            serializedData = ApplicationFeedbackSerializer(appFeedback, many=True)

            return Response(serializedData.data)
        else:
            #return all application feedback
            appFeedback = ApplicationFeedback.objects.all().order_by('user')
            serializedData = ApplicationFeedbackSerializer(appFeedback, many=True)
            return Response(serializedData.data)
 
    ""

#make function for create and show
class businessAreaView(viewsets.ModelViewSet):
    query_set = BusinessArea
    serializer_class = BusinessAreaSerializer

    def get_queryset(self):
        return BusinessArea.objects.all()
        
#make function for create and show
class businessAreaChangeRequestsView(viewsets.ModelViewSet):
    #edit db view
    ""
    
#remove user skipped

#make function for create and show
class meetingFeedbackView(viewsets.ModelViewSet):
    #return view
    serializer_class = MeetingFeedbackSerializer
    def create(self, request, *args, **kwargs):
        profile = Profile.objects.get(user = request.data.get('userID'))
        
        meeting = Meeting.objects.get(pk = request.data.get('meetingID'))
        meetingTitle = Meeting.objects.get(pk = request.data.get('meetingID')).title
        feedback = request.data.get('feedback')
        rating = request.data.get('rating')

        if profile and meeting:
            #add the new object to the database
            newFeedback = MeetingFeedback(feedback=feedback, rating=rating, meeting=meeting, user=profile, meetingtitle=meetingTitle)
            newFeedback.save()
            return Response("Successfully added feedback to database")
        else:
            #return an error to the frontend
            return Response("No profile coresponding to that userID")
    
    def list(self, request, *args, **kwargs):
        userID = request.query_params.get('userID', None)
        if userID is not None:
            #need to write the query here
            profile = Profile.objects.get(user = userID)
            meetingFeedback = MeetingFeedback.objects.filter(user=profile)
            serializedData = MeetingFeedbackSerializer(meetingFeedback, many=True)
            return Response(serializedData.data)
        else:
            return Response("no check")

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

