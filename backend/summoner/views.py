from django.shortcuts import render

from util.get_summoner_data import get_data
from champion.models import Champion
from champion.serializers import ChampionSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view

from bson.json_util import loads

@api_view(['GET'])
def get_user_data(request, username):
    user = username.split(',')
    most_champion_data = loads(get_data(user))
    data = []
    for idx in range(len(user)):
        temp = {}
        summoner_data = most_champion_data[str(idx)]
        temp['summoner'] = summoner_data['summonerName']
        if not summoner_data['mostChampId']:
            temp['most_champion'] = []
        else:
            champion_id = summoner_data['mostChampId']
            champion = Champion.objects.filter(id__in=champion_id)
            serializer = ChampionSerializer(champion, many=True)
            champion_data = []
            for i in range(len(champion_id)):
                temp_champion = serializer.data[i]
                temp_champion['win_rate'] = summoner_data['winRate'][i]
                champion_data.append(temp_champion)
            temp['most_champion'] = champion_data
        data.append(temp)
    return Response(data)
