from rest_framework import serializers
from .models import Champion


class ChampionSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField())


    class Meta:
        model = Champion
        fields = ('id', 'name', 'image', 'tags',)
