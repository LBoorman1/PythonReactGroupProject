from django.db import models
from django.contrib.auth.models import User 
from django.db.models.signals import post_save
from django.dispatch import receiver

# Extends User model
# first_name, last_name, email, is_active (account status), password already included
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    BUSINESS_AREA_CHOICES = [
        ('marketing', 'Marketing'),
        ('humanresources', 'Human Resources'),
        ('finance', 'Finance'),
        ('technology', 'Technology'),
        ('strategy', 'Strategy'),
        ('operations', 'Operations')
        ]
    business_area = models.ForeignKey('BusinessArea', on_delete=models.CASCADE, choices=BUSINESS_AREA_CHOICES)
    is_mentee = models.BooleanField()
    is_mentor = models.BooleanField()
    is_admin = models.BooleanField()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class ApplicationFeedback(models.Model):
    feedback = models.TextField()
    user = models.ForeignKey('Profile', on_delete=models.CASCADE)

class Skill(models.Model):
    name = models.CharField(max_length=20)

class MentorSkill(models.Model):
    mentor = models.ForeignKey('Profile', on_delete=models.CASCADE)
    skill = models.ForeignKey('Skill', on_delete=models.CASCADE)

class MenteeInterest(models.Model):
    mentee = models.ForeignKey('Profile', on_delete=models.CASCADE)
    skill = models.ForeignKey('Skill', on_delete=models.CASCADE)

class MentorRequest(models.Model):
    mentor = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name="requested_mentor")
    mentee = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name="request_mentee")

class Relationship(models.Model):
    ACTIVE_STATUS_CHOICES = [
        ('A', 'active'),
        ('I', 'inactive')
    ]
    mentor = models.ForeignKey('Profile', on_delete=models.CASCADE)
    group = models.BooleanField()
    active_status = models.CharField(max_length=10, choices=ACTIVE_STATUS_CHOICES)
    advertising_for_group = models.BooleanField()

class MenteeAttending(models.Model):
    mentee = models.ForeignKey('Profile', on_delete=models.CASCADE)
    relationship = models.ForeignKey('Relationship', on_delete=models.CASCADE)  

class BecomeMentor(models.Model):
    user = models.ForeignKey('Profile', on_delete=models.CASCADE)
    checked = models.BooleanField()

class BusinessArea(models.Model):
    name = models.CharField(max_length=20)

class BusinessAreaChangeRequest(models.Model):
    user = models.ForeignKey('Profile', on_delete=models.CASCADE)
    request_status = models.CharField(max_length=10)
    new_business_area = models.ForeignKey('BusinessArea', on_delete=models.CASCADE)

class CalendarUser(models.Model):
    user = models.ForeignKey('Profile', on_delete=models.CASCADE)
    available_hour = models.DateTimeField()

class Meeting(models.Model):
    ATTENDANCE_STATUS_CHOICES = [
        ('GA', 'going_ahead'),
        ('C', 'cancelled')
    ]
    relationship = models.ForeignKey('Relationship', on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    attendance_status = models.CharField(max_length=10, choices=ATTENDANCE_STATUS_CHOICES)
    title = models.CharField(max_length=20)
    notes = models.TextField()

class MeetingRequest(models.Model):
    ATTENDANCE_STATUS_CHOICES = [
        ('GA', 'going_ahead'),
        ('C', 'cancelled')
    ]
    relationship = models.ForeignKey('Relationship', on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    attendance_status = models.CharField(max_length=10, choices=ATTENDANCE_STATUS_CHOICES)
    title = models.CharField(max_length=20)
    notes = models.TextField()

class MeetingFeedback(models.Model):
    feedback = models.TextField()
    rating = models.IntegerField()
    meeting = models.ForeignKey('Meeting', on_delete=models.CASCADE)
    user = models.ForeignKey('Profile', on_delete=models.CASCADE)

class PlanOfAction(models.Model):
    relationship = models.ForeignKey('Relationship', on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    set_by_user = models.ForeignKey('Profile', on_delete=models.CASCADE)
    finish_date = models.DateField()

class POATarget(models.Model):
    COMPLETED_STATUS_CHOICES = [
        ('I', 'incomplete'),
        ('C', 'complete')
    ]
    plan_of_action = models.ForeignKey('PlanOfAction', on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    deadline = models.DateField()
    description = models.TextField()
    completed_status = models.CharField(max_length=10, choices=COMPLETED_STATUS_CHOICES)