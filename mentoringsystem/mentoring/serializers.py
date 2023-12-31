from rest_framework import serializers 
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = ('id', 'user', 'business_area', 'is_mentee','is_mentor','is_admin')

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')

class RegisterProfileSerializer(serializers.ModelSerializer):
    user = RegisterUserSerializer(many=False, read_only=False)
    class Meta:
        model = Profile
        fields = ('id', 'user', 'business_area', 'is_mentee','is_mentor','is_admin')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_instance=User.objects.create_user(is_active=True, **user_data)
        profile_data = Profile.objects.create(user = user_instance, **validated_data)
        return profile_data

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect details")

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
        fields = ['available_hour']

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting 
        fields = '__all__'

class MeetingFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingFeedback
        fields = '__all__'

class PlanOfActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanOfAction
        fields = ('id','relationship_id', 'title', 'set_by_user', 'finish_date')

class POATargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = POATarget 
        fields = '__all__'
        
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class SkillNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill 
        fields = ['name']

class MentorSkillNameSerializer(serializers.ModelSerializer):
    skill = SkillNameSerializer(required=True)

    class Meta:
        model = MentorSkill
        fields = ['skill']

class MenteeInterestNameSerializer(serializers.ModelSerializer):
    skill = SkillNameSerializer(required=True)

    class Meta:
        model = MenteeInterest 
        fields = ['skill']

class ProfileWithExtraSerializer(serializers.ModelSerializer):
    # Might need to add search_related_field or whatever the fuck it is to view
    business_area = BusinessAreaSerializer(required=True)
    topics_of_expertise = MentorSkillNameSerializer(many=True)
    topics_of_interest = MenteeInterestNameSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['id', 'is_mentee', 'is_mentor', 'is_admin', 'business_area', 'topics_of_expertise', 'topics_of_interest']

# Used for selecting profile specific detail for a given user
class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileWithExtraSerializer(required=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_active', 'profile']

# Used for selecting user specific detail for a given profile
class ProfileUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    business_area = BusinessAreaSerializer(required=True)
    topics_of_expertise = MentorSkillNameSerializer(many=True)
    topics_of_interest = MenteeInterestNameSerializer(many=True, required=True)

    class Meta:
        model = Profile 
        fields = ['id', 'is_mentee', 'is_mentor', 'is_admin', 'business_area', 'user', 'topics_of_expertise', 'topics_of_interest']

# Used for selecting user details for a given business area change request
class BusinessAreaChangeRequestProfileSerializer(serializers.ModelSerializer):
    profile = ProfileUserSerializer(required=True)
    new_business_area = BusinessAreaSerializer(required=True)
    
    class Meta:
        model = BusinessAreaChangeRequest
        #fields = ['id', 'new_business_area']
        fields = ['id', 'profile', 'new_business_area']

# Used for selecting user details for a given become mentor request
class BecomeMentorProfileSerializer(serializers.ModelSerializer):
    profile = ProfileUserSerializer(required=True)
    
    class Meta:
        model = BecomeMentor
        fields = ['id', 'profile']

# Used for selecting mentee details for a given mentor request
class MentorRequestProfileSerializer(serializers.ModelSerializer):
    mentee = ProfileUserSerializer(required=True)
    
    class Meta:
        model = MentorRequest
        fields = ['id', 'mentee']
        
