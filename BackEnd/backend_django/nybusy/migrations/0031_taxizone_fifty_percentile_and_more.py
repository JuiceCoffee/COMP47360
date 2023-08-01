# Generated by Django 4.2.3 on 2023-08-01 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("nybusy", "0030_alter_taxizone_geometry"),
    ]

    operations = [
        migrations.AddField(
            model_name="taxizone",
            name="fifty_percentile",
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name="taxizone",
            name="seventy_five_percentile",
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name="taxizone",
            name="twenty_five_percentile",
            field=models.FloatField(null=True),
        ),
    ]