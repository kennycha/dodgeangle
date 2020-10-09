from django.shortcuts import render

from util.get_summoner_data import get_data
from util.get_dodge_win_rate import get_win_rate
from champion.models import Champion
from champion.serializers import ChampionSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view

from bson.json_util import loads

from math import log10

@api_view(['GET'])
def test_data(request, username):
    user = username.split(',')
    data = []
    for u in user:
        sample = {
            "summoner": u,
            "streak_win": 1,
            "streak_lose": 0,
            "recommend_champ": [
                143,
                3,
                12,
                235,
                111,
                89,
                99,
                53
            ],
            "most_lane": "top",
            "troll_index": 56.41,
            "troll_list": [
                92.1191834397,
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
                61.0917192549
            ],
            "most_champion": [
                {
                    "id": 143,
                    "name": "자이라",
                    "image": "Zyra.png",
                    "rune": [
                        {
                            "id": 143,
                            "main": "32211",
                            "sub": "2203",
                            "status": "112"
                        }
                    ],
                    "counter": [
                        {
                            "id": 555,
                            "win_rate": 61.5
                        },
                        {
                            "id": 50,
                            "win_rate": 42.9
                        },
                        {
                            "id": 154,
                            "win_rate": 20
                        }
                    ],
                    "pos": [
                        "sup"
                    ],
                    "win_rate": 50.0,
                    "count_game": 4
                },
                {
                    "id": 3,
                    "name": "갈리오",
                    "image": "Galio.png",
                    "rune": [
                        {
                            "id": 3,
                            "main": "42331",
                            "sub": "3310",
                            "status": "113"
                        }
                    ],
                    "counter": [
                        {
                            "id": 236,
                            "win_rate": 43.7
                        },
                        {
                            "id": 777,
                            "win_rate": 41
                        },
                        {
                            "id": 238,
                            "win_rate": 52.5
                        }
                    ],
                    "pos": [
                        "mid",
                        "sup"
                    ],
                    "win_rate": 75.0,
                    "count_game": 4
                },
                {
                    "id": 12,
                    "name": "알리스타",
                    "image": "Alistar.png",
                    "rune": [
                        {
                            "id": 12,
                            "main": "42111",
                            "sub": "5031",
                            "status": "321"
                        }
                    ],
                    "counter": [
                        {
                            "id": 80,
                            "win_rate": 41.5
                        },
                        {
                            "id": 25,
                            "win_rate": 54.7
                        },
                        {
                            "id": 555,
                            "win_rate": 66.7
                        }
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
                    "rune": [
                        {
                            "id": 235,
                            "main": "51232",
                            "sub": "1310",
                            "status": "212"
                        }
                    ],
                    "counter": [
                        {
                            "id": 51,
                            "win_rate": 53.4
                        },
                        {
                            "id": 236,
                            "win_rate": 48.3
                        },
                        {
                            "id": 80,
                            "win_rate": 51.3
                        }
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
                    "rune": [
                        {
                            "id": 111,
                            "main": "42333",
                            "sub": "5031",
                            "status": "321"
                        }
                    ],
                    "counter": [
                        {
                            "id": 80,
                            "win_rate": 39.8
                        },
                        {
                            "id": 99,
                            "win_rate": 46.4
                        },
                        {
                            "id": 555,
                            "win_rate": 57.7
                        }
                    ],
                    "pos": [
                        "sup"
                    ],
                    "win_rate": 33.33,
                    "count_game": 3
                },
                {
                    "id": 89,
                    "name": "레오나",
                    "image": "Leona.png",
                    "rune": [
                        {
                            "id": 89,
                            "main": "42231",
                            "sub": "5031",
                            "status": "321"
                        }
                    ],
                    "counter": [
                        {
                            "id": 555,
                            "win_rate": 53.3
                        },
                        {
                            "id": 80,
                            "win_rate": 56.9
                        },
                        {
                            "id": 99,
                            "win_rate": 49.5
                        }
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
                    "rune": [
                        {
                            "id": 99,
                            "main": "43332",
                            "sub": "5310",
                            "status": "112"
                        }
                    ],
                    "counter": [
                        {
                            "id": 555,
                            "win_rate": 46.4
                        },
                        {
                            "id": 101,
                            "win_rate": 50
                        },
                        {
                            "id": 80,
                            "win_rate": 49.7
                        }
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
                    "rune": [
                        {
                            "id": 53,
                            "main": "42131",
                            "sub": "5031",
                            "status": "321"
                        }
                    ],
                    "counter": [
                        {
                            "id": 555,
                            "win_rate": 55.1
                        },
                        {
                            "id": 235,
                            "win_rate": 54.6
                        },
                        {
                            "id": 80,
                            "win_rate": 54.1
                        }
                    ],
                    "pos": [
                        "sup"
                    ],
                    "win_rate": 100.0,
                    "count_game": 1
                }
            ]
        }
        if u != user[0]:
            sample['recommend_champ'] = None
        data.append(sample)
    return Response(data)
    

@api_view(['GET'])
def get_user_data(request, username):
    user = username.split(',')
    users = get_data(user)
    data = []
    for summoner_data in users:
        champion_data = []
        if summoner_data['mostChampId']:
            champion_id = summoner_data['mostChampId']
            for i in range(len(champion_id)):
                champion = Champion.objects.get(id=champion_id[i])
                serializer = ChampionSerializer(champion).data
                serializer['win_rate'] = summoner_data['winRate'][i]
                champion_data.append(serializer)
        summoner_data['most_champion'] = champion_data
        del summoner_data['mostChampId']
        del summoner_data['winRate']
        data.append(summoner_data)
    return Response(data)

@api_view(['GET'])
def get_dodge_angle(request):
    # 대충 어떤 parameter
    
    troll_score_str = request.GET.get('troll',0)
    
    ally_win_rate = get_win_rate(request.GET.get('ally',0.5))
    enemy_win_rate = get_win_rate(request.GET.get('enemy',0.5))

    if troll_score_str:
        troll_score = list(map(float,troll_score_str.split(',')))
        troll_mean = (sum(troll_score)/len(troll_score))
        
        mul = (((enemy_win_rate)*100)-((ally_win_rate)*100))*50
        print(mul,enemy_win_rate, ally_win_rate)
        da = int( (mul+100)*0.15 + troll_mean*0.7)
        if da>100:
            da=100
        elif da<0:
            da=0

        data = {'allyRate': round(ally_win_rate*100,2),
                'enemyRate':round(enemy_win_rate*100,2),
                'dodgeAngle' : da
                } 
    else:
        data = ['troll input 없음']
    return Response(data)


import random
@api_view(['GET'])
def get_dodge_angle_test(request):
    # 대충 어떤 parameter
    troll_score_str = request.GET.get('troll',0)
    
    ally_win_rate = get_win_rate(request.GET.get('ally',0))
    enemy_win_rate = get_win_rate(request.GET.get('enemy',0))

    data = {'allyRate': random.randrange(1, 100), 'enemyRate': random.randrange(1, 100), 'dodgeAngle': random.randrange(1, 100)}
    return Response(data)