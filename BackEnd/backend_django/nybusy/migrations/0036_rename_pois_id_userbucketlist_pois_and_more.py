# Generated by Django 4.2.3 on 2023-08-04 11:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("nybusy", "0035_rename_time_indext_predictpoi_time_index_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="userbucketlist",
            old_name="pois_id",
            new_name="pois",
        ),
        migrations.RenameField(
            model_name="userbucketlist",
            old_name="user_id",
            new_name="user",
        ),
    ]