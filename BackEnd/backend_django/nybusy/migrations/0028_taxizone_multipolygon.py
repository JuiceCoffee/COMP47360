# Generated by Django 4.2.3 on 2023-07-31 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("nybusy", "0027_poiimage_imageid"),
    ]

    operations = [
        migrations.AddField(
            model_name="taxizone",
            name="multipolygon",
            field=models.TextField(null=True),
        ),
    ]
