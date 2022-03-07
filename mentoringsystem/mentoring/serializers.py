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
        fields = '__all__'

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

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name']

class SkillNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill 
        fields = ['name']

class MentorSkillNameSerializer(serializers.ModelSerializer):
    topic = SkillNameSerializer(required=True)

    class Meta:
        model = MentorSkill
        fields = ['topic']

class MenteeInterestNameSerializer(serializers.ModelSerializer):
    topic = SkillNameSerializer(required=True)

    class Meta:
        model = MenteeInterest 
        fields = ['topic']

class ProfileWithExtraSerializer(serializers.ModelSerializer):
    # Might need to add search_related_field or whatever the fuck it is to view
    business_area = BusinessAreaSerializer(required=True)
    topics_of_expertise = MentorSkillNameSerializer(many=True, required=True)
    topics_of_interest = MenteeInterestNameSerializer(many=True, required=True)

    class Meta:
        model = Profile
        fields = ['id', 'is_mentee', 'is_mentor', 'is_admin', 'business_area', 'topics_of_expertise', 'topics_of_interest']

#class UserWithTopicsSerializer(serializers.ModelSerializer):
    #topics_of_expertise = MentorSkillSerializer(many=True, required=True)
    #topics_of_interest = MenteeInterestSerializer(many=True, required=True)

    #class Meta:
        #model = Profile 
        #fields = ['id', 'first_name', 'last_name', 'email', 'is_active', 'topics_of_expertise', 'topics_of_interest']

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
    topics_of_expertise = MentorSkillNameSerializer(many=True, required=True)
    topics_of_interest = MenteeInterestNameSerializer(many=True, required=True)

    class Meta:
        model = Profile 
        fields = ['id', 'is_mentee', 'is_mentor', 'is_admin', 'business_area', 'topics_of_expertise', 'topics_of_interest', 'user']

# Used for selecting user details for a given business area change request
class BusinessAreaChangeRequestProfileSerializer(serializers.ModelSerializer):
    profile = ProfileUserSerializer(required=True)
    new_business_area = BusinessAreaSerializer(required=True)
    
    class Meta:
        model = BusinessAreaChangeRequest
        fields = ['id', 'profile', 'new_business_area']

# Used for selecting user details for a given become mentor request
class BecomeMentorProfileSerializer(serializers.ModelSerializer):
    profile = ProfileUserSerializer(required=True)
    
    class Meta:
        model = BusinessAreaChangeRequest
        fields = ['id', 'profile']