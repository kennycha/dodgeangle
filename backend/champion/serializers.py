from rest_framework import serializers
from .models import Champion


class ChampionSerializer(serializers.ModelSerializer):
    rune = serializers.SerializerMethodField()
    counter = serializers.SerializerMethodField()
    pos = serializers.SerializerMethodField()


    class Meta:
        model = Champion
        fields = ('id', 'name', 'image', 'rune', 'counter', 'pos',)

    def get_rune(self, obj):
        return obj.rune

    def get_counter(self, obj):
        return obj.counter

    def get_pos(self, obj):
        return obj.pos