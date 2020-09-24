import os, json, shutil
from multiprocessing import Pool
import requests, json, os, time, random
from decouple import config
from datetime import datetime
from tqdm import tqdm
from dataParse import load_dataframes, dump_dataframes
import pandas as pd

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
CHAMPION_FILE = os.path.join(DATA_DIR, "champion.json")
with open(CHAMPION_FILE, encoding="utf-8") as f:
    champ_data = json.loads(f.read())
champ_key_dict = { int(val["key"]):val["name"] for val in champ_data["data"].values() }

# def random_key(flag, key ):
#     if flag:
#         return key
#     return random.choice(range(len(LOL_API_LIST)))

def valid_request(url, params=None, key=random.choice(range(len(LOL_API_LIST)))):
    cnt=0 # 100번 이상 실패시 정지
    # flag = False
    # if key:
    #     flag =True
    while True:
        headers = {'X-Riot-Token': LOL_API_LIST[key] } # 맘에 안듬 이게 최선인가?
        res = requests.get(url, headers=headers, params=params)
        if res.status_code in error_status:
            print(f'[err code] : {res.status_code}')
            continue         
        else:
            break
    return res, key # 사용했던 api key를 넘겨줌

def get_data(summoners, n=20):
    account_ids = []
    for summoner in summoners:
        url = f'{base_url}/lol/summoner/v4/summoners/by-name/{summoner}'
        res, key = valid_request(url)
        account_ids.append( (summoner,res.json()['id'], res.json()["accountId"], key) )

    match_data = { 'summoners': []}
    for summoner,summonerId, account_id, key in tqdm(account_ids): # 5개를 할 것이므로 병렬 ㄱ
        url = f'{base_url}/lol/match/v4/matchlists/by-account/{account_id}'
        params ={'queue':420,'season':13, } 
        res, key = valid_request(url,params,key)
        match_list = res.json()['matches'][:n]  # 여기에 조건문으로 시간 달아주면 됨, 게임 수 결정

        for m in tqdm(match_list):
            url = f'{base_url}/lol/match/v4/matches/{m["gameId"]}'
            match_res, _ = valid_request(url) 
            p_num = None
            for p in match_res.json()['participantIdentities']:
                if p['player']['summonerId'] == summonerId:
                    p_num = p['participantId']
                    break
            if p_num: # p_num 없음 == 일치하는 accountId가 없다
                m['win'] = match_res.json()['participants'][p_num-1]['stats']['win']  # 이게 되네 주소값 굳 # # accountId 로 검색 => 닉변 ㅂㄷㅂㄷ => key값 필요->no id로 간다
        
        match_data[f'summoners'].append({
                                        'summonerName': summoner,
                                        'accountId': account_id,
                                        'key': key,
                                        'matches': match_list
                                         })
        
    # print('저장중 ...')
    # with open('gamedata','w', encoding='UTF-8') as f:
    #     json.dump(match_data, f, indent=2, ensure_ascii=False)

    # or
    print('dump file 생성')
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
                            'mostChampName',
                            'winRate',
                            'mostLane',                        
    )

    match_data_list = []
    for summoner in match_data['summoners']:
        match_list_frame = pd.DataFrame(summoner['matches'])
        most_champ = list(match_list_frame['champion'].value_counts().keys())
        most_champ_name = [champ_key_dict[key] for key in most_champ]
        win_rate = [round(len(match_list_frame[(match_list_frame['champion']==mc) & (match_list_frame['win'] == True)]) /len(match_list_frame[match_list_frame['champion']==mc])*100,2) for mc in most_champ]
        most_lane = []
        match_data_list.append([
            summoner['summonerName'],
            most_champ,
            most_champ_name,
            win_rate,
            most_lane,
        ])
    match_frame = pd.DataFrame(match_data_list, columns=match_data_columns)    
    print(match_frame)


if __name__ == "__main__":
    get_data(['MadRice','planbe']) # default n=20 