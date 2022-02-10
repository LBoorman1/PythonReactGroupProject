from django.db import models

class Meeting(models.Model):
    ATTENDANCE_STATUS_CHOICES = [
        ('GA', 'goingAhead'),
        ('C', 'cancelled')
    ]
    date_time = models.DateTimeField()
    attendance_status = models.CharField(choices=ATTENDANCE_STATUS_CHOICES, max_length=10)
    title = models.CharField(max_length=20)
    description = models.TextField()