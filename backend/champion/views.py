from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

import connDB
from .models import Champion
from .serializers import ChampionSerializer

from pymongo import MongoClient
import json
from bson.json_util import dumps
from bson.json_util import loads

@api_view(['GET'])
def get_all_champion(request):
    champion = Champion.objects.all()
    serializer = ChampionSerializer(champion, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def test(request):
    champion = Champion.objects.all()
    serializer = ChampionSerializer(champion, many=True)
    return Response(serializer.data)
