from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

import connDB
from .models import Entry
from .serializers import TagSerializer, ChampionSerializer, EntrySerializer

from pymongo import MongoClient
import json
from bson.json_util import dumps
from bson.json_util import loads

@api_view(['GET'])
def get_all_champion(request):
    client = connDB.db_client()
    cole = client.get_database('normal')
    collection_list = cole.get_collection('champion_entry').find()
    champion_data = loads(dumps(collection_list))
    data = [ { key:value for key, value in champion.items() if key != '_id'} for champion in champion_data ]
    client.close()
    return Response(data)

@api_view(['GET'])
def test(request):
    entry = Entry.objects.all()
    print(entry[0])
    serializer = EntrySerializer(data=entry)
    if serializer.is_valid(raise_exception=True):
        return Response({'message': 'success save!', 'data': serializer.data})
    return Response({'message': 'fail'})
