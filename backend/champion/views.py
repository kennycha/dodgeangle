from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Champion
from .serializers import ChampionSerializer

@api_view(['GET'])
def get_all_champion(request):
    champion = Champion.objects.all()
    serializer = ChampionSerializer(champion, many=True)
    return Response(serializer.data)