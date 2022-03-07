from django.shortcuts import render
from rest_framework import status, viewsets, mixins, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.generic.list import ListView
from django.contrib.auth.models import User 
from django.db.models import Value
from django.db.models.functions import Concat

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
#from mentoring.models import MeetingRequest
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
#from mentoring.serializers import MeetingRequestSerializer
from mentoring.serializers import MeetingFeedbackSerializer
from mentoring.serializers import PlanOfActionSerializer
from mentoring.serializers import POATargetSerializer
from mentoring.serializers import BusinessAreaChangeRequestProfileSerializer
from mentoring.serializers import BecomeMentorProfileSerializer
from mentoring.serializers import UserProfileSerializer

#4, 5
class BecomeMentorView(mixins.CreateModelMixin,
                       mixins.DestroyModelMixin):
    queryset = BecomeMentor.objects.all()
    serializer_class = BecomeMentorSerializer(queryset, many=True) 

    def check(self, pk):
        become_mentor_request = BecomeMentor.objects.get(pk=pk)
        data = {"checked": True}
        serializer = BecomeMentorSerializer(become_mentor_request, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#6 TEMP - REPLACE WITH ACTUAL MATCHING ALGORITHM
class PossibleMentorsView(mixins.ListModelMixin):
    pass
    #queryset = Profile.objects.select_related(User).filter(is_mentor=True)
    #serializer_class = UserSerializer(queryset, many=True)  

#7, 8
class MentorRequestView(mixins.CreateModelMixin,
                       mixins.DestroyModelMixin):
    queryset = MentorRequest.objects.all()
    serializer_class = MentorRequestSerializer(queryset, many=True) 

#8
class RelationshipView(mixins.CreateModelMixin):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer(queryset, many=True) 

class MenteeAttendingView(mixins.CreateModelMixin):
    queryset = MenteeAttending.objects.all()
    serialzer_class = MenteeAttendingSerializer(queryset, many=True)

#13 
class MenteeInterestView(mixins.CreateModelMixin,
                     mixins.DestroyModelMixin):
    queryset = MenteeInterest.objects.all()
    serializer_class = MenteeInterestSerializer(queryset, many=True) 

#14 
class MentorSkillView(mixins.CreateModelMixin,
                     mixins.DestroyModelMixin):
    queryset = MentorSkill.objects.all()
    serializer_class = MentorSkillSerializer(queryset, many=True) 

#19, 20
class BusinessAreaChangeRequestView(mixins.CreateModelMixin,
                                   mixins.DestroyModelMixin,
                                   viewsets.GenericViewSet):
    queryset = BusinessAreaChangeRequest.objects.all()
    serializer_class = BusinessAreaChangeRequestSerializer(queryset, many=True) 

    def check(self, pk):
        business_area_request = BusinessAreaChangeRequest.objects.get(pk=pk)
        data = {"checked": True}
        serializer = BusinessAreaChangeRequestSerializer(business_area_request, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#12 might need to change to instead select by user
class AvailableHourView(mixins.CreateModelMixin,
                       mixins.DestroyModelMixin):
    queryset = CalendarUser.objects.all()
    serializer_class = CalendarUserSerializer(queryset, many=True) 

#9
class MeetingView(viewsets.ViewSet,
                 mixins.CreateModelMixin):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer(queryset, many=True) 

    def list(self):
        relationship = self.kwargs['relationship']
        queryset = Meeting.objects.filter(relationship=relationship)
        serializer = MeetingSerializer(queryset, many=True) 
        return Response(serializer.data)

#self.kwargs[''] is what you need
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

#class showMeetingRequestsView(viewsets.ModelViewSet):
    #return view
    #queryset = Meeting.objects.all()
    #serializer_class = MeetingRequestSerializer(queryset, many=True)

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

#17
class SkillView(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.DestroyModelMixin,
                     viewsets.GenericViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

#18
class BusinessAreaView(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.DestroyModelMixin,
                     viewsets.GenericViewSet):
    queryset = BusinessArea.objects.all()
    serializer_class = BusinessAreaSerializer

class addExpertiseView(viewsets.ModelViewSet):
    #edit db view
    ""

class removeExpertiseView(viewsets.ModelViewSet):
    #edit db view
    ""

# Ability to create and view application feedback
#15, 16
class ApplicationFeedbackView(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer
    #serializer_class = ApplicationFeedbackSerializer(queryset, many=True)      

class SearchUser(generics.ListAPIView):
    serializer_class = UserProfileSerializer 

    def get_queryset(self):
        name = self.request.query_params.get('name')
        serializer = UserProfileSerializer
        # Concatenate first name and last name together and filter results that contain search parameter
        queryset = User.objects.annotate(search_name=Concat('first_name', Value(' '), 'last_name')) 
        results = queryset.filter(search_name__contains=name)

        serializer = UserProfileSerializer(results, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def search_user(request):
    name = request.query_params.get('name')
    # Concatenate first name and last name together and filter results that contain search parameter
    queryset = User.objects.annotate(search_name=Concat('first_name', Value(' '), 'last_name')) 
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

class EditUserView:
    # Toggles a user's admin status between admin and not admin
    def toggle_admin(self, pk):
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
    
    #5
    def set_mentor(self, request, pk):
        user = User.objects.get(pk=pk)
        profile = user.profile 
        serializer = ProfileSerializer(profile, data={"is_mentor": True}, partial=True)
        
        # Add topics of expertise
        #for topic in request.data.topics:
            #mentor_skill = MentorSkill(mentor=profile.id, skill=topic)
            #mentor_skill.save()

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #3
    def set_mentee(self, request, pk):
        user = User.objects.get(pk=pk)
        profile = user.profile 
        serializer = ProfileSerializer(profile, data={"is_mentee": True}, partial=True)
        
        # Add topics of interest
        for topic in request.data.topics:
            mentor_skill = MentorSkill(mentor=profile.id, skill=topic)
            mentor_skill.save()

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    #21
    def toggle_active(self, pk):
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
    
    #20
    def set_business_area(self, request, pk):
        user = User.objects.get(pk=pk)
        profile = user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get user objects along with business area change requests
class BusinessAreaChangeRequestUserView(viewsets.GenericViewSet):
    queryset = BusinessAreaChangeRequest.objects.filter(checked=False)

    def list(self, request):
        business_area_requests = BusinessAreaChangeRequest.objects.filter(checked=False)
        serializer = BusinessAreaChangeRequestProfileSerializer(business_area_requests, many=True)
        return Response(serializer.data)

def business_area_change_request_user_view():
    pass 

# Get user objects along with become mentor requests
class BecomeMentorUserView(viewsets.GenericViewSet):
    queryset = BecomeMentor.objects.filter(checked=False)

    def list(self, request):
        become_mentor_requests = BecomeMentor.objects.filter(checked=False)
        serializer = BecomeMentorProfileSerializer(become_mentor_requests, many=True)
        return Response(serializer.data)

class addBusinessAreaView(viewsets.ModelViewSet):
    #edit db view
    ""

#class businessAreaChangeRequestsView(viewsets.ModelViewSet):
    #edit db view
    #""

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

class showSystemFeedbackView(viewsets.ModelViewSet):
    pass 

class addSystemFeedbackView(viewsets.ModelViewSet):
    pass 

class businessAreaChangeRequestsView(viewsets.ModelViewSet):
    pass