# Generated by Django 4.2.2 on 2023-07-16 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("nybusy", "0003_rename_address_poi_address_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="userbucketlist",
            name="planned_visit_datetime",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
