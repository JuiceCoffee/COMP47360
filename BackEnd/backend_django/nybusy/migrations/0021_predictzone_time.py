# Generated by Django 4.2.2 on 2023-07-25 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("nybusy", "0020_alter_poi_location_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="predictzone",
            name="time",
            field=models.DateTimeField(null=True),
        ),
    ]
