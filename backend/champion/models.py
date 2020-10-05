from django.db import models


class Champion(models.Model):
    name = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    pos = models.CharField(max_length=200)
    counter = models.CharField(max_length=200)

class Rune(models.Model):
    primary = models.IntegerField()
    primary1 = models.IntegerField()
    primary2 = models.IntegerField()
    primary3 = models.IntegerField()
    primary4 = models.IntegerField()
    sub = models.IntegerField()
    sub1 = models.IntegerField()
    sub2 = models.IntegerField()
    stat1 = models.IntegerField()
    stat2 = models.IntegerField()
    stat3 = models.IntegerField()