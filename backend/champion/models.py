from django.db import models

class Champion(models.Model):
    name = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    rune = models.CharField(max_length=200)
    pos = models.CharField(max_length=200)
    counter = models.CharField(max_length=200)
