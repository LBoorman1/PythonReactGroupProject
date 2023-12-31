# Generated by Django 4.0.2 on 2022-02-10 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('attendance_status', models.CharField(choices=[('GA', 'goingAhead'), ('C', 'cancelled')], max_length=10)),
                ('title', models.CharField(max_length=20)),
                ('description', models.TextField()),
            ],
        ),
    ]
