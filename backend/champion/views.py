from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view

from .connDB import db_client

from pymongo import MongoClient
import json, os
from bson.json_util import dumps
from bson.json_util import loads

@api_view(['GET'])
def get_all_champion(request):
    client = db_client()
    cole = client.get_database('normal_db')
    collection_list = cole.get_collection('champion').find()
    champion_data = loads(dumps(collection_list))
    data = {}
    for champion in champion_data:
        temp = {}
        for key, value in champion.items():
            if key != '_id' and key != 'key':
                temp[key] = value
        data[champion['key']] = temp
    client.close()
    return Response(data)