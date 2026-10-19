from __future__ import absolute_import,unicode_literals

import os

from celery import Celery

from django.conf import settings
from celery.schedules import crontab
# from django_celery_beat.models import PeriodicTask
os.environ.setdefault('DJANGO_SETTINGS_MODULE','backend.settings')
app=Celery('backend')

app.conf.enable_utc=False

app.conf.update(timezone='Asia/Kolkata')

app.config_from_object(settings,namespace='CELERY')

app.conf.beat_schedule={
    'send-mail-every-day-at-8':{
        'task':'premiumCourse.tasks.send_mail_func',
        'schedule':crontab(hour=10,minute=1),
        # 'args':(2,)
    }
}

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Resquest :{self.reuest!r}')