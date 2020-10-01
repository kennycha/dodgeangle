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
        temp['streak_win'] = summoner_data['win']
        temp['streak_lose'] = summoner_data['lose']
        temp['most_lane'] = 'top'
        temp['troll_index'] = 50.0
        if not summoner_data['mostChampId']:
            temp['most_champion'] = []
        else:
            champion_id = summoner_data['mostChampId']
            # champion = Champion.objects.filter(id__in=champion_id)
            # serializer = ChampionSerializer(champion, many=True)
            champion_data = []
            for i in range(len(champion_id)):
                champion = Champion.objects.get(id=champion_id[i])
                temp_champion = ChampionSerializer(champion).data
                # temp_champion = serializer.data
                # idx = champion_id.index(temp_champion['id'])
                temp_champion['win_rate'] = summoner_data['winRate'][i]
                temp_champion['count_game'] = summoner_data['mostChampCount'][i]
                champion_data.append(temp_champion)
            temp['most_champion'] = champion_data
        data.append(temp)
    return Response(data)
