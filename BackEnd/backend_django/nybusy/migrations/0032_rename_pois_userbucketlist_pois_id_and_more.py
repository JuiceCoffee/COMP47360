# Generated by Django 4.2.3 on 2023-08-02 19:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("nybusy", "0031_taxizone_fifty_percentile_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="userbucketlist",
            old_name="pois",
            new_name="pois_id",
        ),
        migrations.RenameField(
            model_name="userbucketlist",
            old_name="user",
            new_name="user_id",
        ),
    ]
