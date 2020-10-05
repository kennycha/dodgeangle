from rest_framework import serializers
from .models import Champion, Rune


class ChampionSerializer(serializers.ModelSerializer):
    counter = serializers.ListField(child=serializers.CharField())
    pos = serializers.ListField(child=serializers.CharField())


    class Meta:
        model = Champion
        fields = ('id', 'name', 'image', 'counter', 'pos',)


class RuneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rune
        fields = ('primary', 'primary1', 'primary2', 'primary3', 'primary4', 'sub', 'sub1', 'sub2', 'stat1', 'stat2', 'stat3',)

    