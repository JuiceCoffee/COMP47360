# Generated by Django 4.2.2 on 2023-07-20 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("nybusy", "0004_tag_remove_poi_address_remove_poi_category_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="poi",
            name="liked_by",
        ),
    ]
