# Generated by Django 4.2.3 on 2023-07-29 22:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("nybusy", "0025_predict"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Predict",
            new_name="PredictPOI",
        ),
    ]