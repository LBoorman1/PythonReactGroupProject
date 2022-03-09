import re
from django.http import request
from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from rest_framework.views import APIView
from rest_framework.decorators import api_view
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
from mentoring.serializers import UserProfileSerializer

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
        return Response("Logout successful")

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

    class meetingView2(viewsets.ModelViewSet):
        template_name = 'calendarView.html'
        serializer_class = MeetingSerializer

        def get_context_data(self,**kwargs):
            context = super(meetingView,self).get_context_data(**kwargs)
            context['eventList'] = Event.objects.all()
            return context

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
class POAView(viewsets.ModelViewSet):
    #return view
    queryset = PlanOfAction.objects.all()
    serializer_class = PlanOfActionSerializer

    def create(self, request, *args, **kwargs):
        profile_id = request.data["profile_id"]
        is_mentee = request.data["is_mentee"]
        is_mentor = request.data["is_mentor"]
        target_profile_id = request.data["target_profile_id"]
        title = request.data["title"]
        finish_date = request.data["finish_date"]
        
        
        # if the mentee creates the poa
        if is_mentee == True and is_mentor == False:
            relationship_query = list(MenteeAttending.objects.filter(mentee_id = profile_id).values_list('relationship',flat=True))
            mentor_query = [Relationship.objects.get(id= x, group=False) for x in relationship_query]
            mentor_relationship = mentor_query[0] # there should be only one mentor
            
            poa = PlanOfAction.objects.create(relationship=mentor_relationship, title=title, set_by_user=Profile.objects.get(id=profile_id), finish_date = finish_date)
            poa_id = poa.id

            return Response(poa_id)

        elif is_mentee == False and is_mentor == True:
            relationship_query = list(MenteeAttending.objects.filter(mentee = Profile.objects.get(id=target_profile_id)).values_list('relationship',flat=True))
            mentor_query = [Relationship.objects.get(id= x, group=False) for x in relationship_query]
            mentor_relationship = mentor_query[0]
            
            poa = PlanOfAction.objects.create(relationship=mentor_relationship, title=title, set_by_user=Profile.objects.get(id=profile_id), finish_date = finish_date)
            poa_id = poa.id

            return Response(poa_id)

    def list(self, request, *args, **kwargs):
        profile_id = request.query_params.get('profile_id',None)
        if profile_id == None: return Response("Incorrect details provided")
        m_value = request.query_params.get('m_value',None)
        response_list=[]

        # if the user is accessing as a mentee
        if m_value == "m1":
            relationship_query = list(MenteeAttending.objects.filter(mentee_id = profile_id).values_list('relationship',flat=True))
            
            # getting mentor data
            mentor_query = [Relationship.objects.values_list('id','mentor').get(id= x, group=False) for x in relationship_query]
            mentor_profile = Profile.objects.get(id=mentor_query[0][1]) # there should be only one mentor
            mentor_name = User.objects.get(id=mentor_profile.user_id)
            mentor_data = UserSerializer(mentor_name).data
            
            poa_query = list(PlanOfAction.objects.filter(relationship = mentor_query[0][0]).values_list())
            for poa_tuple in poa_query:
                poa_data = PlanOfActionSerializer(PlanOfAction.objects.get(id=poa_tuple[0])).data
                # getting poa target data
                poatarget_completed_query = POATarget.objects.filter(plan_of_action = poa_tuple, completed_status='C')
                poatarget_completed_data = [POATargetSerializer(x).data for x in poatarget_completed_query]
                poatarget_incomplete_query = POATarget.objects.filter(plan_of_action = poa_tuple, completed_status='I')
                poatarget_incomplete_data = [POATargetSerializer(x).data for x in poatarget_incomplete_query]
                response_list.append({"poa":poa_data, "mentor": mentor_data, "poatarget_completed_list" : poatarget_completed_data, "poatarget_incomplete_list" : poatarget_incomplete_data})
        elif m_value == "m2":
            relationship_query = list(Relationship.objects.filter(mentor_id = profile_id, group=False))

            # getting mentee data and plans of action for every relationship
            for r in relationship_query:
                # getting mentee data
                mentee_query = MenteeAttending.objects.get(relationship = r)
                mentee_profile = Profile.objects.get(id=mentee_query.mentee_id)
                mentee_name = User.objects.get(id = mentee_profile.user_id)
                mentee_data = UserSerializer(mentee_name).data

                #getting plan of action
                poa_query = PlanOfAction.objects.filter(relationship = r)
                #response_list.append(str(poa_query))
                for poa_tuple in poa_query:
                    poa_data = PlanOfActionSerializer(PlanOfAction.objects.get(id=poa_tuple.id)).data
                    # getting poa target data
                    poatarget_completed_query = POATarget.objects.filter(plan_of_action = poa_tuple, completed_status='C')
                    poatarget_completed_data = [POATargetSerializer(x).data for x in poatarget_completed_query]
                    poatarget_incomplete_query = POATarget.objects.filter(plan_of_action = poa_tuple, completed_status='I')
                    poatarget_incomplete_data = [POATargetSerializer(x).data for x in poatarget_incomplete_query]
                    response_list.append({"poa":poa_data, "mentee": mentee_data, "poatarget_completed_list" : poatarget_completed_data, "poatarget_incomplete_list" : poatarget_incomplete_data})

        return Response(response_list)

#make function for create and show
class POATargetCreateView(viewsets.ModelViewSet):
    #return view
    queryset = POATarget.objects.all()
    serializer_class = POATargetSerializer

    #update or create poa target
    def create(self, request, *args, **kwargs):
        poa_id = request.data["poa_id"]
        target_list = request.data["target_list"]
        for target in target_list:
            POATarget.objects.create(plan_of_action_id=poa_id, title=target, completed_status='I')

        return Response("POA target inserted")

class POATargetUpdateView(viewsets.ModelViewSet):
    #return view
    queryset = POATarget.objects.all()
    serializer_class = POATargetSerializer

    #update or create poa target
    def create(self, request, *args, **kwargs):
        poatarget_id=request.data["poatarget_id"]
        completed = request.data["completed_status"]
        if completed:
            POATarget.objects.filter(id=poatarget_id).update(completed_status='C')
        else:
            POATarget.objects.filter(id=poatarget_id).update(completed_status='I')

        return Response("POA target updated")

class menteeOptionsView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def list(self, request, *args, **kwargs):
        mentor_id = request.query_params.get('mentor_id',None)
        relationship_query = list(Relationship.objects.filter(mentor_id = mentor_id, group=False))
        mentee_query = [MenteeAttending.objects.get(relationship = x) for x in relationship_query]
        mentee_profile = [Profile.objects.get(id=x.mentee_id) for x in mentee_query]
        mentee_data = [ProfileSerializer(x).data for x in mentee_profile]
        return Response(mentee_data)

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

@api_view(['GET'])
def search_user(request):
    name = request.query_params.get('name')
    # Concatenate first name and last name together and filter results that contain search parameter
    queryset = User.objects.annotate(search_name=Concat('first_name', Value(' '), 'last_name')) 
    results = queryset.filter(search_name__contains=name)

    serializer = UserProfileSerializer(results, many=True)
    return Response(serializer.data)
