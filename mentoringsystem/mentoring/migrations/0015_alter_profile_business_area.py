# Generated by Django 4.0.2 on 2022-03-09 21:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mentoring', '0014_merge_20220309_2158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='business_area',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mentoring.businessarea'),
        ),
    ]
