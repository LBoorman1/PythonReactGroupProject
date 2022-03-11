import re
from django.http import request
from django.shortcuts import render
from rest_framework import status, viewsets, mixins, generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.generic.list import ListView
from django.contrib.auth.models import User
from django.db.models import Value
from django.db.models.functions import Concat
from django.db.models import Q
from functools import reduce
import operator
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout
import profile
import operator
from django.db.models import Q
from django.db.models.functions import Concat
from django.db.models import Value

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
#from mentoring.serializers import MeetingRequestSerializer
from mentoring.serializers import MeetingFeedbackSerializer
from mentoring.serializers import PlanOfActionSerializer
from mentoring.serializers import POATargetSerializer
from mentoring.serializers import BusinessAreaChangeRequestProfileSerializer
from mentoring.serializers import BecomeMentorProfileSerializer
from mentoring.serializers import MentorRequestProfileSerializer
from mentoring.serializers import UserProfileSerializer
from mentoring.serializers import ProfileUserSerializer

# TEMP - REPLACE WITH ACTUAL MATCHING ALGORITHM
class PotentialMentorsView(viewsets.GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileUserSerializer 

    def list(self, request):
        potential_mentors = Profile.objects.filter(is_mentor=True)
        serializer = ProfileUserSerializer(potential_mentors, many=True)
        return Response(serializer.data)
    #queryset = Profile.objects.select_related(User).filter(is_mentor=True)
    #serializer_class = UserSerializer(queryset, many=True)


class BusinessAreaChangeRequestView(viewsets.GenericViewSet,
                                  mixins.CreateModelMixin):
    queryset = BusinessAreaChangeRequest.objects.all()
    serializer_class = BusinessAreaChangeRequestSerializer


class RegisterView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = RegisterProfileSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_profile = serializer.save()
        #return Response({})
        return Response({
            "user": ProfileSerializer(user_profile).data,
            #"token": Token.objects.create(user=user_profile.user).key
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
    # edit db view
    ""


class mentorSignupView(viewsets.ModelViewSet):
    # edit db view
    ""

# Create both relationship and a mentee attending it
# WILL NEED FIXING 
@api_view(['POST'])
def add_mentoring_relationship(request):
    mentor = User.objects.get(pk=request.data.get('mentor_id')).profile
    mentee = User.objects.get(pk=request.data.get('mentee_id')).profile

    relationship = Relationship.objects.create(
        mentor=mentor, group=request.data.get('group'), active_status='A',
        advertising_for_group=request.data.get('advertising_for_group'))
    mentee_attending = MenteeAttending.objects.create(
        mentee=mentee, relationship=relationship)
    return Response(request.data)

# If a mentor or mentee ends a mentoring relationship
@api_view(['PATCH'])
def end_mentoring_relationship(request):
    print("test")
    relationship = Relationship.objects.get(pk=request.data.get('id'))
    # Set to inactive
    data = {'active_status': 'I'}
    serializer = RelationshipSerializer(relationship, data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# might not need function for create, remove and show


class FreeHoursView(viewsets.GenericViewSet):
    queryset = Meeting.objects.all()
    serializer_class = CalendarUserSerializer

    def create(self, request):
        user = User.objects.get(pk=request.data.get('user_id'))
        profile = user.profile
        new_hour = CalendarUser(
            user=profile, available_hour=request.data.get('available_hour'))
        new_hour.save()
        return Response(request.data)

    def list(self, request):
        user = User.objects.get(pk=request.query_params.get('user_id'))
        profile = user.profile
        free_hours = CalendarUser.objects.filter(
            user=profile).order_by('-available_hour')
        serializer = CalendarUserSerializer(free_hours, many=True)
        return Response(serializer.data)

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

    # class meetingView2(viewsets.ModelViewSet):
    #     template_name = 'calendarView.html'
    #     serializer_class = MeetingSerializer

    #     def get_context_data(self,**kwargs):
    #         context = super(meetingView,self).get_context_data(**kwargs)
    #         context['eventList'] = Event.objects.all()
    #         return context

#cancel meeting view skipped

#end mentoring relationship skipped

# might not need function for create, remove and show
class interestsView(viewsets.ModelViewSet):
    # return view
    queryset = Meeting.objects.all()
    serializer_class = SkillSerializer(queryset, many=True)

# might not need function for create, remove and show


class expertiseView(viewsets.ModelViewSet):
    # return view
    queryset = Meeting.objects.all()
    serializer_class = SkillSerializer(queryset, many=True)


class addExpertiseView(viewsets.ModelViewSet):
    # edit db view
    ""


class removeExpertiseView(viewsets.ModelViewSet):
    # edit db view
    ""

# make function for create and show


class applicationFeedbackView(viewsets.ModelViewSet):
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer

    def create(self, request, *args, **kwargs):
        profile = Profile.objects.get(user = request.data.get('userID'))
        feedback = request.data.get('feedback')
        if profile:
            # add the new object to the database
            newFeedback = ApplicationFeedback(feedback=feedback, user=profile)
            newFeedback.save()
            return Response("Successfully added feedback to database")
        else:
            # return an error to the frontend
            return Response("No profile coresponding to that userID")

    def list(self, request, *args, **kwargs):
        userID = request.query_params.get('userID', None)
        if userID is not None:
            #need to write the query here
            profile = Profile.objects.get(user = userID)
            appFeedback = ApplicationFeedback.objects.filter(user=profile)

            serializedData = ApplicationFeedbackSerializer(
                appFeedback, many=True)

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

# make function for create and show


class meetingFeedbackView(viewsets.ModelViewSet):
    # return view
    serializer_class = MeetingFeedbackSerializer
    queryset = MeetingFeedback.objects.all()

    def create(self, request, *args, **kwargs):
        profile = Profile.objects.get(user = request.data.get('userID'))
        
        meeting = Meeting.objects.get(pk = request.data.get('meetingID'))
        meetingTitle = Meeting.objects.get(pk = request.data.get('meetingID')).title
        feedback = request.data.get('feedback')
        rating = request.data.get('rating')

        if profile and meeting:
            # add the new object to the database
            newFeedback = MeetingFeedback(
                feedback=feedback, rating=rating, meeting=meeting, user=profile, meetingtitle=meetingTitle)
            newFeedback.save()
            return Response("Successfully added feedback to database")
        else:
            # return an error to the frontend
            return Response("No profile coresponding to that userID")

    def list(self, request, *args, **kwargs):
        userID = request.query_params.get('userID', None)
        if userID is not None:
            #need to write the query here
            profile = Profile.objects.get(user = userID)
            meetingFeedback = MeetingFeedback.objects.filter(user=profile)
            serializedData = MeetingFeedbackSerializer(
                meetingFeedback, many=True)
            return Response(serializedData.data)
        else:
            return Response("no check")

# make function for create and show


class POAView(viewsets.ModelViewSet):
    # return view
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
            relationship_query = list(MenteeAttending.objects.filter(
                mentee_id=profile_id).values_list('relationship', flat=True))
            mentor_query = [Relationship.objects.get(
                id=x, group=False) for x in relationship_query]
            # there should be only one mentor
            mentor_relationship = mentor_query[0]

            poa = PlanOfAction.objects.create(relationship=mentor_relationship, title=title, set_by_user=Profile.objects.get(
                id=profile_id), finish_date=finish_date)
            poa_id = poa.id

            return Response(poa_id)

        elif is_mentee == False and is_mentor == True:
            relationship_query = list(MenteeAttending.objects.filter(mentee=Profile.objects.get(
                id=target_profile_id)).values_list('relationship', flat=True))
            mentor_query = [Relationship.objects.get(
                id=x, group=False) for x in relationship_query]
            mentor_relationship = mentor_query[0]

            poa = PlanOfAction.objects.create(relationship=mentor_relationship, title=title, set_by_user=Profile.objects.get(
                id=profile_id), finish_date=finish_date)
            poa_id = poa.id

            return Response(poa_id)

    def list(self, request, *args, **kwargs):
        profile_id = request.query_params.get('profile_id', None)
        if profile_id == None:
            return Response("Incorrect details provided")
        m_value = request.query_params.get('m_value', None)
        response_list = []

        # if the user is accessing as a mentee
        if m_value == "m1":
            relationship_query = list(MenteeAttending.objects.filter(
                mentee_id=profile_id).values_list('relationship', flat=True))

            # getting mentor data
            mentor_query = [Relationship.objects.values_list('id', 'mentor').get(
                id=x, group=False) for x in relationship_query]
            mentor_profile = Profile.objects.get(
                id=mentor_query[0][1])  # there should be only one mentor
            mentor_name = User.objects.get(id=mentor_profile.user_id)
            mentor_data = UserSerializer(mentor_name).data

            poa_query = list(PlanOfAction.objects.filter(
                relationship=mentor_query[0][0]).values_list())
            for poa_tuple in poa_query:
                poa_data = PlanOfActionSerializer(
                    PlanOfAction.objects.get(id=poa_tuple[0])).data
                # getting poa target data
                poatarget_completed_query = POATarget.objects.filter(
                    plan_of_action=poa_tuple, completed_status='C')
                poatarget_completed_data = [POATargetSerializer(
                    x).data for x in poatarget_completed_query]
                poatarget_incomplete_query = POATarget.objects.filter(
                    plan_of_action=poa_tuple, completed_status='I')
                poatarget_incomplete_data = [POATargetSerializer(
                    x).data for x in poatarget_incomplete_query]
                response_list.append({"poa": poa_data, "mentor": mentor_data, "poatarget_completed_list":
                                     poatarget_completed_data, "poatarget_incomplete_list": poatarget_incomplete_data})
        elif m_value == "m2":
            relationship_query = list(Relationship.objects.filter(
                mentor_id=profile_id, group=False))

            # getting mentee data and plans of action for every relationship
            for r in relationship_query:
                # getting mentee data
                mentee_query = MenteeAttending.objects.get(relationship=r)
                mentee_profile = Profile.objects.get(id=mentee_query.mentee_id)
                mentee_name = User.objects.get(id=mentee_profile.user_id)
                mentee_data = UserSerializer(mentee_name).data

                # getting plan of action
                poa_query = PlanOfAction.objects.filter(relationship=r)
                # response_list.append(str(poa_query))
                for poa_tuple in poa_query:
                    poa_data = PlanOfActionSerializer(
                        PlanOfAction.objects.get(id=poa_tuple.id)).data
                    # getting poa target data
                    poatarget_completed_query = POATarget.objects.filter(
                        plan_of_action=poa_tuple, completed_status='C')
                    poatarget_completed_data = [POATargetSerializer(
                        x).data for x in poatarget_completed_query]
                    poatarget_incomplete_query = POATarget.objects.filter(
                        plan_of_action=poa_tuple, completed_status='I')
                    poatarget_incomplete_data = [POATargetSerializer(
                        x).data for x in poatarget_incomplete_query]
                    response_list.append({"poa": poa_data, "mentee": mentee_data, "poatarget_completed_list":
                                         poatarget_completed_data, "poatarget_incomplete_list": poatarget_incomplete_data})

        return Response(response_list)

# make function for create and show


class POATargetCreateView(viewsets.ModelViewSet):
    # return view
    queryset = POATarget.objects.all()
    serializer_class = POATargetSerializer

    # update or create poa target
    def create(self, request, *args, **kwargs):
        poa_id = request.data["poa_id"]
        target_list = request.data["target_list"]
        for target in target_list:
            POATarget.objects.create(
                plan_of_action_id=poa_id, title=target, completed_status='I')

        return Response("POA target inserted")


class POATargetUpdateView(viewsets.ModelViewSet):
    # return view
    queryset = POATarget.objects.all()
    serializer_class = POATargetSerializer

    # update or create poa target
    def create(self, request, *args, **kwargs):
        poatarget_id = request.data["poatarget_id"]
        completed = request.data["completed_status"]
        if completed:
            POATarget.objects.filter(
                id=poatarget_id).update(completed_status='C')
        else:
            POATarget.objects.filter(
                id=poatarget_id).update(completed_status='I')

        return Response("POA target updated")


class menteeOptionsView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def list(self, request, *args, **kwargs):
        mentor_id = request.query_params.get('mentor_id', None)
        relationship_query = list(Relationship.objects.filter(
            mentor_id=mentor_id, group=False))
        mentee_query = [MenteeAttending.objects.get(
            relationship=x) for x in relationship_query]
        mentee_profile = [Profile.objects.get(
            id=x.mentee_id) for x in mentee_query]
        mentee_data = [ProfileSerializer(x).data for x in mentee_profile]
        return Response(mentee_data)

# show interest for some skill


class showSkillInterestView(viewsets.ModelViewSet):
    # return view
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)

# make function for create and show


class groupMeetingsView(viewsets.ModelViewSet):
    def create(self, request, *args, **kwargs):
        mentor = Profile.objects.get(user = request.data.get('userID'))
        if mentor:
            #could check if the user is a mentor
            newRelationship = Relationship.objects.create(mentor=mentor, group=True, active_status='A', advertising_for_group=True)
            newRelationship.save()
            newMeeting = Meeting(relationship=newRelationship, date_time=request.data.get('dateStart'), attendance_status='GA', title=request.data.get('meetingTitle'), notes=request.data.get('meetingNotes'))
            newMeeting.save()
            return Response("check")
    
    def list(self, request, *args, **kwargs):
        
            #need to write the query here
            #relationships = list(Relationship.objects.filter(group=True).values_list('pk', flat=True))
            relationships = Relationship.objects.filter(group=True)
            query = reduce(operator.or_, (Q(relationship=x) for x in relationships))
            result = Meeting.objects.filter(query).order_by('relationship')

            serializedData = MeetingSerializer(result, many=True)
            return Response(serializedData.data)


# cancel attendance skipped


class menteeAttendingView(viewsets.ModelViewSet):
    def create(self, request, *args, **kwargs):
        userID = request.data.get('userID')
        if userID:
            profile = Profile.objects.get(user=userID)    
            relationshipID = request.data.get('relationship')
            relationship = Relationship.objects.get(pk = relationshipID)
            if MenteeAttending.objects.filter(mentee=profile, relationship=relationship).exists():
                return Response("exists already")
            else:
                newMenteeAttending = MenteeAttending.objects.create(mentee=profile, relationship=relationship)
                newMenteeAttending.save()    
                return Response("added to db")

class showSystemFeedbackView(viewsets.ModelViewSet):
    pass


class addSystemFeedbackView(viewsets.ModelViewSet):
    pass


class SkillView(mixins.CreateModelMixin,
                mixins.ListModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def destroy(self, request, pk):
        skill = Skill.objects.get(pk=pk)
        skill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BusinessAreaView(mixins.CreateModelMixin,
                       mixins.ListModelMixin,
                       mixins.DestroyModelMixin,
                       viewsets.GenericViewSet):
    queryset = BusinessArea.objects.all()
    serializer_class = BusinessAreaSerializer

    def destroy(self, request, pk):
        business_area = BusinessArea.objects.get(pk=pk)
        business_area.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Ability to create and view application feedback


class AllApplicationFeedbackView(mixins.CreateModelMixin,
                                 mixins.ListModelMixin,
                                 viewsets.GenericViewSet):
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer

# Get mentoring relationship that a user is part of as a mentee for a given user ID


@api_view(['GET'])
def get_mentee_relationship(request):
    user = User.objects.get(pk=request.query_params.get('user_id'))
    profile_id = user.profile.id
    # Get all relationships that mentee is part of
    relationship_id_set = list(MenteeAttending.objects.filter(
        mentee=profile_id).values_list('relationship', flat=True))
    relationship_set = [Relationship.objects.get(
        id=id) for id in relationship_id_set]
    # Filter out group and inactive relationships so we get the one mentoring relationship for the mentor
    relationship = filter(
        lambda r: not r.group and r.active_status == "A", relationship_set)
    serializer = RelationshipSerializer(relationship, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_user_details(request):
    user_details = User.objects.get(pk=request.query_params.get('user_id'))
    serializer = UserProfileSerializer(user_details)
    return Response(serializer.data)

# Get a mentor's mentees as well as each relationship ID


@api_view(['GET'])
def get_mentor_mentees(request):
    mentee_details = []
    user = User.objects.get(pk=request.query_params.get('user_id'))
    profile_id = user.profile.id
    mentor_relationships = Relationship.objects.filter(
        mentor=profile_id, active_status='A', group=False)
    for rel in mentor_relationships:
        for mentee_attending in MenteeAttending.objects.filter(relationship_id=rel.id):
            mentee_data = ProfileUserSerializer(
                Profile.objects.get(pk=mentee_attending.mentee.id)).data
            mentee_data['relationship'] = rel.id
            mentee_details.append(mentee_data)
    return Response(mentee_details)

# Get a mentee's mentor as well as the relationship ID


@api_view(['GET'])
def get_mentee_mentor(request):
    user = User.objects.get(pk=request.query_params.get('user_id'))
    profile_id = user.profile.id
    possible_relationships = MenteeAttending.objects.filter(mentee=profile_id)
    for rel in possible_relationships:
        relationship = Relationship.objects.get(pk=rel.relationship_id)
        # Should only be one mentor, so return the first one that works
        if relationship.active_status == 'A' and relationship.group == False:
            mentor_details = ProfileUserSerializer(relationship.mentor).data
            mentor_details['relationship'] = relationship.id
            return Response(mentor_details)

    # No mentor found
    return Response({})


@api_view(['GET'])
def search_user(request):
    name = request.query_params.get('name')
    # Concatenate first name and last name together and filter results that contain search parameter
    queryset = User.objects.annotate(
        search_name=Concat('first_name', Value(' '), 'last_name'))
    results = queryset.filter(search_name__contains=name)

    serializer = UserProfileSerializer(results, many=True)
    return Response(serializer.data)


@api_view(['PATCH'])
def toggle_admin(request, pk):
    user = User.objects.get(pk=pk)
    profile = user.profile
    if (profile.is_admin):
        data = {"is_admin": False}
    else:
        data = {"is_admin": True}
    serializer = ProfileSerializer(profile, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def toggle_active(request, pk):
    user = User.objects.get(pk=pk)
    if (user.is_active):
        data = {"is_active": False}
    else:
        data = {"is_active": True}
    serializer = UserSerializer(user, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def set_mentor(request, pk):
    user = User.objects.get(pk=pk)
    profile = user.profile
    serializer = ProfileSerializer(
        profile, data={"is_mentor": True}, partial=True)

    # Add topics of expertise
    # for topic in request.data.topics:
    #mentor_skill = MentorSkill(mentor=profile.id, skill=topic)
    # mentor_skill.save()

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
# If a prospective mentor is denied, their topics of expertise need to be
# removed from the MentorSkill table
def remove_topics_of_expertise(request, pk):
    user = User.objects.get(pk=pk)
    profile_id = user.profile.id
    MentorSkill.objects.filter(mentor=profile_id).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PATCH'])
def set_mentee(request, pk):
    user = User.objects.get(pk=pk)
    profile = user.profile
    serializer = ProfileSerializer(
        profile, data={"is_mentee": True}, partial=True)

    # Add topics of interest
    for topic in request.data.topics:
        mentor_skill = MentorSkill(mentor=profile.id, skill=topic)
        mentor_skill.save()

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def set_business_area(request, pk):
    user = User.objects.get(pk=pk)
    profile = user.profile
    serializer = ProfileSerializer(profile, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def check_off_become_mentor(request, pk):
    become_mentor_request = BecomeMentor.objects.get(pk=pk)
    data = {"checked": True}
    serializer = BecomeMentorSerializer(
        become_mentor_request, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def check_off_business_area_change_request(request, pk):
    business_area_request = BusinessAreaChangeRequest.objects.get(pk=pk)
    data = {"checked": True}
    serializer = BusinessAreaChangeRequestSerializer(
        business_area_request, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get user objects along with business area change requests
class BusinessAreaChangeRequestUserView(viewsets.GenericViewSet):
    queryset = BusinessAreaChangeRequest.objects.filter(checked=False)
    serializer_class = BusinessAreaChangeRequestSerializer

    def list(self, request):
        business_area_requests = BusinessAreaChangeRequest.objects.filter(
            checked=False)
        serializer = BusinessAreaChangeRequestProfileSerializer(
            business_area_requests, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        profile = User.objects.get(pk=request.data.get('user_id')).profile
        new_business_area = BusinessArea.objects.get(pk=request.data.get('new_business_area_id'))
        business_area_change_request = BusinessAreaChangeRequest.objects.create(
            profile=profile,
            checked=request.data.get('checked'),
            new_business_area=new_business_area
        )
        return Response(request.data)

# Get user objects along with become mentor requests
class BecomeMentorUserView(viewsets.GenericViewSet):
    queryset = BecomeMentor.objects.filter(checked=False)

    def list(self, request):
        become_mentor_requests = BecomeMentor.objects.filter(checked=False)
        serializer = BecomeMentorProfileSerializer(
            become_mentor_requests, many=True)
        return Response(serializer.data)

# Get user objects along with mentor requests for a specific mentor 
class MentorRequestUserView(viewsets.GenericViewSet,
                            mixins.CreateModelMixin,
                            mixins.DestroyModelMixin):
    queryset = MentorRequest.objects.all()
    serializer_class = MentorRequestSerializer 

    def list(self, request):
        user = User.objects.get(pk=request.query_params.get('user_id'))
        profile_id = user.profile.id
        mentor_requests = MentorRequest.objects.filter(mentor=profile_id)
        serializer = MentorRequestProfileSerializer(mentor_requests, many=True)
        return Response(serializer.data)

    def create(self, request):
        # Get mentee and mentor objects from user IDs
        mentee = User.objects.get(pk=request.data.get('mentee_id')).profile
        mentor = User.objects.get(pk=request.data.get('mentor_id')).profile
        MentorRequest.objects.create(mentee=mentee, mentor=mentor)
        return Response(request.data)

    # Once a request has been dealt with it should be deleted
    def destroy(self, request, pk):
        # Should only be one request from a mentee at a given time
        mentor_request = MentorRequest.objects.get(pk=pk)
        mentor_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Get mentor requests for a specific mentee
@api_view(['GET'])
def get_mentee_mentor_requests(request):
    user = User.objects.get(pk=request.query_params.get('user_id'))
    profile_id = user.profile.id
    mentor_requests = MentorRequest.objects.filter(mentee=profile_id)
    serializer = MentorRequestSerializer(mentor_requests, many=True)
    return Response(serializer.data)


class MeetingView(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def list(self, request, *args, **kwargs):
        userID = request.query_params.get('userID', None)
        if userID is not None:
            # need to write the query here
            profile = Profile.objects.get(pk=userID)
            menteeAttending = MenteeAttending.objects.filter(mentee=profile)
            relationships = list(
                menteeAttending.values_list('relationship', flat=True))

            query = reduce(operator.or_, (Q(relationship=x)
                           for x in relationships))
            result = Meeting.objects.filter(query)

            serializedData = MeetingSerializer(result, many=True)

            return Response(serializedData.data)
        else:
            return Response("no check")

    # class meetingView2(viewsets.ModelViewSet):
        #template_name = 'calendarView.html'
        #serializer_class = MeetingSerializer

        # def get_context_data(self,**kwargs):
            #context = super(meetingViewTemp,self).get_context_data(**kwargs)
            #context['eventList'] = Event.objects.all()
            # return context
