from rest_framework import serializers 
from mentoring.models import Meeting 

# Meeting Serializer
class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting 
        fields = '__all__'
