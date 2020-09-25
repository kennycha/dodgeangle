from multiprocessing import Pool
import requests, json, os, time, random, shutil
from decouple import config
from datetime import datetime
import pandas as pd

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

import connDB

from pymongo import MongoClient
from bson.json_util import dumps
from bson.json_util import loads

LOL_API_KEY = config('LOL_API_KEY') # 같은 디렉토리에 .env 파일 생성 후 api 키 복붙
LOL_API_KEY2 = config('LOL_API_KEY2')
LOL_API_KEY3 = config('LOL_API_KEY3')
LOL_API_KEY4 = config('LOL_API_KEY4')
LOL_API_KEY5 = config('LOL_API_KEY5')
LOL_API_KEY6 = config('LOL_API_KEY6')


LOL_API_LIST = [LOL_API_KEY, LOL_API_KEY2]
base_url = 'https://kr.api.riotgames.com' 

error_status = [400, 401, 403, 429, 500, 502, 503, 504] # 404는 제외
DATA_DIR = 'data'

def get_champion_data():
    client = connDB.db_client()
    cole = client.get_database('normal')
    collection_list = cole.get_collection('champion_entry').find()
    champion_data = loads(dumps(collection_list))
    champ_key_dict = [ { key:value for key, value in champion.items() if key != '_id'} for champion in champion_data ]
    client.close()
    return champ_key_dict


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
        match_list = res.json()['matches'][:n]

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
        
        match_data[f'summoners'].append({
                                        'summonerName': summoner,
                                        'accountId': account_id,
                                        'key': key,
                                        'matches': match_list
                                         })
    match_list_columns =(
                            'gameId',
                            'championId',
                            'win',
                            'role',
                            'lane'
    )
    match_data_columns = (
                            'summonerName',
                            'mostChampId',
                            'winRate',
                            'mostLane',                        
    )

    match_data_list = []
    for summoner in match_data['summoners']:
        match_list_frame = pd.DataFrame(summoner['matches'])
        most_champ = list(match_list_frame['champion'].value_counts().keys())
        win_rate = [round(len(match_list_frame[(match_list_frame['champion']==mc) & (match_list_frame['win'] == True)]) /len(match_list_frame[match_list_frame['champion']==mc])*100,2) for mc in most_champ]
        most_lane = []
        match_data_list.append([
            summoner['summonerName'],
            most_champ,
            win_rate,
            most_lane,
        ])
    match_frame = pd.DataFrame(match_data_list, columns=match_data_columns)
    match_json = match_frame.to_json(orient='records')
    return match_json


def main():
    # get_data(['MadRice', 'planbe'])
    champ_key_dict = get_champion_data()
    print(champ_key_dict)

if __name__ == "__main__":
    main()