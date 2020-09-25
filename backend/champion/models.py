from djongo import models


class Tag(models.Model):
    tag = models.CharField()

    class Meta:
        abstract = True


class Champion(models.Model):
    id = models.IntegerField()
    name = models.CharField()
    image = models.CharField()
    tags = models.ArrayField(
        model_container=Tag,
    )

    class Meta:
        abstract = True


class Entry(models.Model):
    _id = models.ObjectIdField()
    champion = models.EmbeddedField(
        model_container=Champion
    )

    objects = models.DjongoManager()

# e = Entry.objects.create(
#     champion = {
#         'id': 1,
#         'name': 'testname',
#         'image': 'test.jpg',
#         'tags':['test', 'tes']
#     })