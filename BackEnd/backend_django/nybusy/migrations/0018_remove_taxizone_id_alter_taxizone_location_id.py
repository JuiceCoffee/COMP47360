# Generated by Django 4.2.2 on 2023-07-25 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("nybusy", "0017_predictzone_remove_taxizone_busy_level_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="taxizone",
            name="id",
        ),
        migrations.AlterField(
            model_name="taxizone",
            name="location_id",
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
