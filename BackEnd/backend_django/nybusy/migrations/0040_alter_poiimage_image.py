# Generated by Django 4.2.3 on 2023-08-10 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("nybusy", "0039_poi_liked_by"),
    ]

    operations = [
        migrations.AlterField(
            model_name="poiimage",
            name="image",
            field=models.ImageField(
                blank=True, default="images/default.jpg", null=True, upload_to="images/"
            ),
        ),
    ]
