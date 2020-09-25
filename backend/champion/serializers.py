from rest_framework import serializers
from .models import Entry, Champion, Tag


class TagSerializer(serializers.ModelSerializer):
    # tag = serializers.CharField()

    class Meta:
        model = Tag
        fields = ('tag',)


class ChampionSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField()
    # name = serializers.CharField()
    # image = serializers.CharField()
    tags = TagSerializer()

    class Meta:
        model = Champion
        fields = ('id', 'name', 'image',) + TagSerializer.Meta.fields


class EntrySerializer(serializers.ModelSerializer):
    champion = ChampionSerializer()

    class Meta:
        model = Entry
        fields = ChampionSerializer.Meta.fields
