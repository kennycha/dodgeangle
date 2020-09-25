from django.shortcuts import render

import connDB
from .get_summoner_data import get_data

from rest_framework.response import Response
from rest_framework.decorators import api_view

from bson.json_util import loads

@api_view(['GET'])
def get_user_data(request, username):
    user = username.split(',')
    data = loads(get_data(user))
    return Response(data)
