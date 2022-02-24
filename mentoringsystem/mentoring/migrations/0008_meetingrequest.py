# Generated by Django 4.0.2 on 2022-02-18 16:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mentoring', '0007_alter_meeting_relationship_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MeetingRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('attendance_status', models.CharField(choices=[('GA', 'going_ahead'), ('C', 'cancelled')], max_length=10)),
                ('title', models.CharField(max_length=20)),
                ('notes', models.TextField()),
                ('relationship', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mentoring.relationship')),
            ],
        ),
    ]
