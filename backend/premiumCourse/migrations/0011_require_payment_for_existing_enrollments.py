from django.db import migrations


def mark_existing_enrollments_unpaid(apps, schema_editor):
    ClassEnroll = apps.get_model('premiumCourse', 'ClassEnroll')
    ClassEnroll.objects.using(schema_editor.connection.alias).update(isPaid=False)


class Migration(migrations.Migration):

    dependencies = [
        ('premiumCourse', '0010_order_premium_course'),
    ]

    operations = [
        migrations.RunPython(
            mark_existing_enrollments_unpaid,
            migrations.RunPython.noop,
        ),
    ]
