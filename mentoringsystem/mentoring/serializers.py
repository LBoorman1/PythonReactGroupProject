from rest_framework import serializers
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'password1', 'password2', 'is_active']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ApplicationFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationFeedback
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
        
class MentorSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorSkill
        fields = '__all__'

class MenteeInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenteeInterest
        fields = '__all__'

class MentorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorRequest
        fields = '__all__'

class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = '__all__'

class MenteeAttendingSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenteeAttending
        fields = '__all__'

class BecomeMentorSerializer(serializers.ModelSerializer):
    class Meta:
        model = BecomeMentor
        fields = '__all__'

class BusinessAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessArea
        fields = '__all__'

class BusinessAreaChangeRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessAreaChangeRequest
        fields = '__all__'

class CalendarUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarUser
        fields = '__all__'

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting 
        fields = '__all__'

class MeetingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingRequest 
        fields = '__all__'

class MeetingFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingFeedback
        fields = '__all__'

class PlanOfActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanOfAction
        fields = '__all__'

class POATargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = POATarget 
        fields = '__all__'