from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MeetingSerializer
from .models import Meeting

# Meeting View
class MeetingView(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer 