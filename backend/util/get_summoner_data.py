from multiprocessing import Pool
import requests, json, os, time, random, shutil
from decouple import config
from datetime import datetime
import pandas as pd

from util.get_troll_score import get_troll_score, troll_preprocess
from util.get_recommend_champ import recommend_champs

LOL_API_KEY = config('LOL_API_KEY') # 같은 디렉토리에 .env 파일 생성 후 api 키 복붙
LOL_API_KEY2 = config('LOL_API_KEY2')
LOL_API_KEY3 = config('LOL_API_KEY3')
LOL_API_KEY4 = config('LOL_API_KEY4')
LOL_API_KEY5 = config('LOL_API_KEY5')


LOL_API_LIST = [LOL_API_KEY, LOL_API_KEY2, LOL_API_KEY3, LOL_API_KEY4, LOL_API_KEY5]
base_url = 'https://kr.api.riotgames.com' 

error_status = [400, 401, 403, 429, 500, 502, 503, 504] # 404는 제외
DATA_DIR = 'data'

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

def get_match_data(m):
    '''라이언 api로 각 경기 데이터를 요청하여 필요한 데이터 스크래핑'''
    champ = m['champion']   # 각 매치의 10 플레이어 중 자신을 골라낼 키

    # riot api 요청
    match_url = f'{base_url}/lol/match/v4/matches/{m["gameId"]}'
    while True:
        headers = {'X-Riot-Token': random.choice(LOL_API_LIST) }
        match_res = requests.get(match_url, headers=headers)
        if match_res.status_code in error_status:
            print(f'[err code] : {match_res.status_code}')
            continue
        else:
            break
    
    # 10 플레이어 중 키와 일치하는 자가 플레이어
    match = match_res.json()
    player = [ p for p in match['participants'] if p['championId'] == champ ][0]

    ## m['win'] >>> count_score
    isWin = player['stats']['win']

    ## troll each >>> troll_list >>> troll_index
    _data = troll_preprocess(player, match['gameDuration'])
    troll_each = get_troll_score(player['championId'], *_data)

    return (isWin, troll_each)

# error code 403
# - matchs "key error" : 데이터 없음 return
def get_data(summoners, n=20):
    account_ids = []
    for summoner in summoners:
        url = f'{base_url}/lol/summoner/v4/summoners/by-name/{summoner}'
        res, key = valid_request(url)
        account_ids.append( (summoner, res.json()['id'], res.json()["accountId"], key) )

    match_data = { 'summoners': [] }
    for summoner, summonerId, account_id, key in account_ids:
        url = f'{base_url}/lol/match/v4/matchlists/by-account/{account_id}'
        params ={'queue':420,'season':13, } 
        res, key = valid_request(url,params,key)
        if res.status_code == 404:
            match_list = []
            troll_list = [0]
        else:
            match_list = res.json()['matches'][:n]
            troll_list = []

        ####### 병렬처리 작업시작점
        count_score = []
        with Pool(processes=5) as pool: # 병렬처리
            pooled_list = pool.map(get_match_data, match_list)

        # 병렬작업 후처리
        for i, _data in enumerate(pooled_list):
            isWin, troll_each = _data

            # pnum, isWin
            match_list[i]['win'] = isWin

            # troll_each
            troll_list.append(troll_each)
        troll_index = round(sum(troll_list) / len(troll_list), 2)   # 평균
        
        match_data['summoners'].append({
                                        'summonerName': summoner,
                                        'accountId': account_id,
                                        'key': key,
                                        'matches': match_list,
                                        'trollList': troll_list,
                                        'trollIndex': troll_index,
                                         }) # end scrapping loop

    match_data_list = []
    for summoner in match_data['summoners']:
        match_list_frame = pd.DataFrame(summoner['matches'])
        win, lose = 0, 0
        if not summoner['matches']:
            most_champ = []
            win_rate = []
        else:
            most_champ = list(match_list_frame['champion'].value_counts().keys())
            win_rate = [round(len(match_list_frame[(match_list_frame['champion']==mc) & (match_list_frame['win'] == True)]) /len(match_list_frame[match_list_frame['champion']==mc])*100,2) for mc in most_champ]

            streak = min([i for i in range(len(match_list_frame['win'])) if match_list_frame['win'][i] != match_list_frame['win'][0]])
            win = streak if match_list_frame['win'][0] else 0
            lose = streak if not match_list_frame['win'][0] else 0
            
        # 추천 챔피언
        if summoner['summonerName'] == summoners[0]:
            recomm_champ = recommend_champs(most_champ)
            if not recomm_champ:
                recomm_champ = random.sample([22, 61, 80, 98, 104, 117, 201, 360, 516, 777, 876], 3)
        else:
            recomm_champ = None

        match_data_list.append({
            'summoner': summoner['summonerName'],
            'streak_win': win,
            'streak_lose': lose,
            'recommend_champ': recomm_champ,
            'mostChampId': most_champ,
            'winRate': win_rate,
            'troll_list': summoner['trollList'],
            'troll_index': summoner['trollIndex'],
        })

    return match_data_list


def main():
    get_data(['MadRice', 'planbe'])


if __name__ == "__main__":
    main()