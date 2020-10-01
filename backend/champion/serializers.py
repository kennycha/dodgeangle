from rest_framework import serializers
from .models import Champion


class ChampionSerializer(serializers.ModelSerializer):
    counter = serializers.ListField(child=serializers.CharField())
    pos = serializers.ListField(child=serializers.CharField())


    class Meta:
        model = Champion
        fields = ('id', 'name', 'image', 'counter', 'pos',)
