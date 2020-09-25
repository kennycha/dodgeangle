from django.db import models


class Champion(models.Model):
    name = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    tags = models.CharField(max_length=200)