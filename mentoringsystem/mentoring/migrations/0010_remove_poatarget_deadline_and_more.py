# Generated by Django 4.0.2 on 2022-03-07 19:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mentoring', '0009_meetingfeedback_meetingtitle'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='poatarget',
            name='deadline',
        ),
        migrations.RemoveField(
            model_name='poatarget',
            name='description',
        ),
    ]