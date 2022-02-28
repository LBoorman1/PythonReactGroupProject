from django.shortcuts import render
from rest_framework import Response, status, viewsets, mixins 
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

class SkillView(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.DestroyModelMixin):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer(queryset, many=True)   

class BusinessAreaView(mixins.CreateModelMixin,
                     mixins.ListModelMixin,
                     mixins.DestroyModelMixin):
    queryset = BusinessArea.objects.all()
    serializer_class = BusinessAreaSerializer(queryset, many=True)  

class addExpertiseView(viewsets.ModelViewSet):
    #edit db view
    ""

class removeExpertiseView(viewsets.ModelViewSet):
    #edit db view
    ""

# Ability to create and view system feedback
class SystemFeedbackView(mixins.CreateModelMixin,
                     mixins.ListModelMixin):
    queryset = ApplicationFeedback.objects.all()
    serializer_class = ApplicationFeedbackSerializer(queryset, many=True)      

class EditUser():
    # Toggles a user's admin status between admin and not admin
    def toggle_admin(self, request, pk):
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
    
    def set_mentor(self, request, pk):
        user = User.objects.get(pk=pk)
        profile = user.profile 
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        
        # Add topics of expertise
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def deactivate_account(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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