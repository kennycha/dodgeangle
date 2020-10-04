from multiprocessing import Pool
import requests, json, os, time, random, shutil
from decouple import config
from datetime import datetime
import pandas as pd

from util.connDB import db_client
from util.get_troll_score import get_troll_score, troll_preprocess

from champion.models import Champion
from champion.serializers import ChampionSerializer

LOL_API_KEY = config('LOL_API_KEY') # 같은 디렉토리에 .env 파일 생성 후 api 키 복붙
LOL_API_KEY2 = config('LOL_API_KEY2')
LOL_API_KEY3 = config('LOL_API_KEY3')
LOL_API_KEY4 = config('LOL_API_KEY4')
LOL_API_KEY5 = config('LOL_API_KEY5')


LOL_API_LIST = [LOL_API_KEY, LOL_API_KEY2, LOL_API_KEY3, LOL_API_KEY4, LOL_API_KEY5]
base_url = 'https://kr.api.riotgames.com' 

error_status = [400, 401, 403, 429, 500, 502, 503, 504] # 404는 제외
DATA_DIR = 'data'

def get_champion_data():
    champion = Champion.objects.all()
    serializer = ChampionSerializer(champion, many=True)
    return serializer.data


def valid_request(url, params=None, key=random.choice(range(len(LOL_API_LIST)))):
    cnt=0 # 100번 이상 실패시 정지
    while True:
        headers = {'X-Riot-Token': LOL_API_LIST[key] }
        res = requests.get(url, headers=headers, params=params)
        if res.status_code in error_status:
            print(f'[err code] : {res.status_code}')
            continue         
        else:
            break
    return res, key


# error code 403
# - matchs "key error" : 데이터 없음 return
def get_data(summoners, n=20):
    champ_key_dict = get_champion_data()
    account_ids = []
    for summoner in summoners:
        url = f'{base_url}/lol/summoner/v4/summoners/by-name/{summoner}'
        res, key = valid_request(url)
        account_ids.append( (summoner,res.json()['id'], res.json()["accountId"], key) )

    match_data = { 'summoners': []}
    for summoner, summonerId, account_id, key in account_ids:
        url = f'{base_url}/lol/match/v4/matchlists/by-account/{account_id}'
        params ={'queue':420,'season':13, } 
        res, key = valid_request(url,params,key)
        if res.status_code == 404:
            match_list = []
        else:
            match_list = res.json()['matches'][:n]

        count_score = []
        troll_list = []
        for m in match_list:
            url = f'{base_url}/lol/match/v4/matches/{m["gameId"]}'
            match_res, _ = valid_request(url) 
            p_num = None
            for p in match_res.json()['participantIdentities']:
                if p['player']['summonerId'] == summonerId:
                    p_num = p['participantId']
                    break
            if p_num:
                m['win'] = match_res.json()['participants'][p_num-1]['stats']['win']
                count_score.append(m['win'])

            (champ_id, kda, dpm, gpm) = troll_preprocess(match_res.json(), p_num)
            troll_each = get_troll_score(champ_id, kda, dpm, gpm)
            troll_list.append(troll_each)
        troll_index = round(sum(troll_list) / len(troll_list), 2)   # 평균
        # print(troll_list)
        # print(troll_index)

        if count_score[0]:
            win, lose = count_score.index(False), 0
        else:
            win, lose = 0, count_score.index(True)
        
        match_data['summoners'].append({
                                        'summonerName': summoner,
                                        'accountId': account_id,
                                        'key': key,
                                        'matches': match_list
                                         })
    match_data_columns = (
                            'summonerName',
                            'win',
                            'lose',
                            'mostChampId',
                            'mostChampCount',
                            'winRate',
                            'mostLane',
    )

    match_data_list = []
    for summoner in match_data['summoners']:
        match_list_frame = pd.DataFrame(summoner['matches'])
        if not summoner['matches']:
            most_champ = []
            most_champ_count = []
            win_rate = []
            most_lane = []
        else:
            most_champ = list(match_list_frame['champion'].value_counts().keys())
            most_champ_count = list(match_list_frame['champion'].value_counts())
            win_rate = [round(len(match_list_frame[(match_list_frame['champion']==mc) & (match_list_frame['win'] == True)]) /len(match_list_frame[match_list_frame['champion']==mc])*100,2) for mc in most_champ]
            most_lane = []
        match_data_list.append([
            summoner['summonerName'],
            win,
            lose,
            most_champ,
            most_champ_count,
            win_rate,
            most_lane,
        ])
    match_frame = pd.DataFrame(match_data_list, columns=match_data_columns)
    match_json = match_frame.to_json(orient='index')
    return match_json


def main():
    # get_data(['MadRice', 'planbe'])
    champ_key_dict = get_champion_data()
    print(champ_key_dict)

if __name__ == "__main__":
    main()