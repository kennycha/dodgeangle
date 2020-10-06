from django.shortcuts import render

from util.get_summoner_data import get_data
from champion.models import Champion
from champion.serializers import ChampionSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view

from bson.json_util import loads


@api_view(['GET'])
def test_data(request, username):
    user = username.split(',')
    data = []
    for u in user:
        sample = {
            "summoner": u,
            "streak_win": 1,
            "streak_lose": 0,
            "most_lane": "top",
            "troll_index": 51.86,
            "troll_list": [
                35.6063431046,
                14.3615053105,
                95.938916121,
                65.4577877575,
                66.8294196445,
                83.5900798468,
                43.623524503,
                73.6727889508,
                49.0693398366,
                59.5570617952,
                90.1951083214,
                37.0118564801,
                0.5200997623,
                76.2104985491,
                36.209040536,
                41.3487503577,
                85.4407744092,
                20.39591892,
                61.0917192549,
                0.9952816002
            ],
            "most_champion": [
                {
                    "id": 143,
                    "name": "자이라",
                    "image": "Zyra.png",
                    "counter": [
                        "OrderedDict([('id', 555), ('win_rate', 61.5)])",
                        "OrderedDict([('id', 50), ('win_rate', 42.9)])",
                        "OrderedDict([('id', 154), ('win_rate', 20.0)])"
                    ],
                    "pos": [
                        "sup"
                    ],
                    "win_rate": 60.0,
                    "count_game": 5
                },
                {
                    "id": 12,
                    "name": "알리스타",
                    "image": "Alistar.png",
                    "counter": [
                        "OrderedDict([('id', 80), ('win_rate', 41.5)])",
                        "OrderedDict([('id', 25), ('win_rate', 54.7)])",
                        "OrderedDict([('id', 555), ('win_rate', 66.7)])"
                    ],
                    "pos": [
                        "sup"
                    ],
                    "win_rate": 66.67,
                    "count_game": 3
                },
                {
                    "id": 235,
                    "name": "세나",
                    "image": "Senna.png",
                    "counter": [
                        "OrderedDict([('id', 51), ('win_rate', 53.4)])",
                        "OrderedDict([('id', 236), ('win_rate', 48.3)])",
                        "OrderedDict([('id', 80), ('win_rate', 51.3)])"
                    ],
                    "pos": [
                        "adc",
                        "sup"
                    ],
                    "win_rate": 33.33,
                    "count_game": 3
                },
                {
                    "id": 111,
                    "name": "노틸러스",
                    "image": "Nautilus.png",
                    "counter": [
                        "OrderedDict([('id', 80), ('win_rate', 39.8)])",
                        "OrderedDict([('id', 99), ('win_rate', 46.4)])",
                        "OrderedDict([('id', 555), ('win_rate', 57.7)])"
                    ],
                    "pos": [
                        "sup"
                    ],
                    "win_rate": 33.33,
                    "count_game": 3
                },
                {
                    "id": 3,
                    "name": "갈리오",
                    "image": "Galio.png",
                    "counter": [
                        "OrderedDict([('id', 236), ('win_rate', 43.7)])",
                        "OrderedDict([('id', 777), ('win_rate', 41.0)])",
                        "OrderedDict([('id', 238), ('win_rate', 52.5)])"
                    ],
                    "pos": [
                        "mid",
                        "sup"
                    ],
                    "win_rate": 66.67,
                    "count_game": 3
                },
                {
                    "id": 89,
                    "name": "레오나",
                    "image": "Leona.png",
                    "counter": [
                        "OrderedDict([('id', 555), ('win_rate', 53.3)])",
                        "OrderedDict([('id', 80), ('win_rate', 56.9)])",
                        "OrderedDict([('id', 99), ('win_rate', 49.5)])"
                    ],
                    "pos": [
                        "sup"
                    ],
                    "win_rate": 100.0,
                    "count_game": 1
                },
                {
                    "id": 99,
                    "name": "럭스",
                    "image": "Lux.png",
                    "counter": [
                        "OrderedDict([('id', 555), ('win_rate', 46.4)])",
                        "OrderedDict([('id', 101), ('win_rate', 50.0)])",
                        "OrderedDict([('id', 80), ('win_rate', 49.7)])"
                    ],
                    "pos": [
                        "mid",
                        "sup"
                    ],
                    "win_rate": 100.0,
                    "count_game": 1
                },
                {
                    "id": 53,
                    "name": "블리츠크랭크",
                    "image": "Blitzcrank.png",
                    "counter": [
                        "OrderedDict([('id', 555), ('win_rate', 55.1)])",
                        "OrderedDict([('id', 235), ('win_rate', 54.6)])",
                        "OrderedDict([('id', 80), ('win_rate', 54.1)])"
                    ],
                    "pos": [
                        "sup"
                    ],
                    "win_rate": 100.0,
                    "count_game": 1
                }
            ]
        }
        data.append(sample)
    return Response(data)
    

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
        temp['recommend_champ'] = summoner_data['recommendChampId']
        temp['most_lane'] = 'top'
        temp['troll_index'] = summoner_data['trollIndex']
        temp['troll_list'] = summoner_data['trollList']
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
