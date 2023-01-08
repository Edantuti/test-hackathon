from django.db import models

from django.utils import timezone

# Create your models here.


class Videos(models.Model):
    name=models.CharField(max_length=2000)
    video=models.FileField(upload_to="video")
    created_at=models.DateTimeField()


    class Meta:
        verbose_name="video"

class Audios(models.Model):
    name=models.CharField(max_length=2000)
    path=models.CharField(max_length=2000)
    created_at=models.DateTimeField()