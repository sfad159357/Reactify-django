# Generated by Django 3.0.7 on 2020-07-13 11:34

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0005_lead_change_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='change_at',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 13, 11, 34, 33, 752587, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='lead',
            name='create_at',
            field=models.DateTimeField(default=datetime.datetime(2020, 7, 13, 11, 34, 33, 752542, tzinfo=utc)),
        ),
    ]
