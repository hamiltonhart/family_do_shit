# Generated by Django 3.0.5 on 2020-04-16 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_items', '0003_auto_20200416_1818'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todoitem',
            name='completed_date',
            field=models.DateField(null=True),
        ),
    ]