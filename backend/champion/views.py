from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Champion, Rune
from .serializers import ChampionSerializer, RuneSerializer

@api_view(['GET'])
def get_all_champion(request):
    champion = Champion.objects.all()
    serializer = ChampionSerializer(champion, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_champion_rune(request, champion_id):
    rune = Rune.objects.get(id=champion_id)
    serializer = RuneSerializer(rune)
    return Response(serializer.data)