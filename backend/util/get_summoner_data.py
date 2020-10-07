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

def get_match_data(ms):
    m = ms[0]
    summonerId = ms[1]

    match_url = f'{base_url}/lol/match/v4/matches/{m["gameId"]}'
    while True:
        headers = {'X-Riot-Token': random.choice(LOL_API_LIST) }
        match_res = requests.get(match_url, headers=headers)
        if match_res.status_code in error_status:
            print(f'[err code] : {match_res.status_code}')
            continue
        else:
            break

    ## finding p_num
    p_num = None
    p_flag = False
    for p in match_res.json()['participantIdentities']:
        if p['player']['summonerName'].lower() == summonerId.lower():
            p_num = p['participantId']
            p_flag = True
            break
    if p_flag == False:
        raise Exception('[예외] 최근에 아이디를 바꾼 팀원이 있는 것으로 추정됩니다.')

    ## m['win'] >>> count_score
    if p_num:
        m['win'] = match_res.json()['participants'][p_num-1]['stats']['win']

    ## troll each >>> troll_list >>> troll_index
    (champ_id, kda, dpm, gpm) = troll_preprocess(match_res.json(), p_num)
    troll_each = get_troll_score(champ_id, kda, dpm, gpm)

    return (p_num, m['win'], troll_each)

# error code 403
# - matchs "key error" : 데이터 없음 return
def get_data(summoners, n=20):
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

        ####### 병렬처리 작업시작점
        rendered_match_list = [(match, summoner) for match in match_list]

        count_score = []
        troll_list = []
        with Pool(processes=5) as pool: # 병렬처리
            pooled_list = pool.map(get_match_data, rendered_match_list)

        # 후처리
        for i, _data in enumerate(pooled_list):
            p_num, mwin, troll_each = _data

            # pnum, mwin
            if p_num:
                match_list[i]['win'] = mwin
                count_score.append(mwin)

            # troll_each
            troll_list.append(troll_each)
        troll_index = round(sum(troll_list) / len(troll_list), 2)   # 평균

        if count_score[0]:
            win, lose = count_score.index(False), 0
        else:
            win, lose = 0, count_score.index(True)
        
        match_data['summoners'].append({
                                        'summonerName': summoner,
                                        'accountId': account_id,
                                        'key': key,
                                        'matches': match_list,
                                        'trollList': troll_list,
                                        'trollIndex': troll_index,
                                         })
    match_data_columns = (
                            'summonerName',
                            'win',
                            'lose',
                            'recommendChampId',
                            'mostChampId',
                            'mostChampCount',
                            'winRate',
                            'mostLane',
                            'trollList',
                            'trollIndex',
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

        # 추천 챔피언
        if summoner['summonerName'] == summoners[0]:
            recomm_champ = recommend_champs(most_champ)
        else:
            recomm_champ = None
        
        match_data_list.append([
            summoner['summonerName'],
            win,
            lose,
            recomm_champ,
            most_champ,
            most_champ_count,
            win_rate,
            most_lane,
            summoner['trollList'],
            summoner['trollIndex'],
        ])
    match_frame = pd.DataFrame(match_data_list, columns=match_data_columns)
    match_json = match_frame.to_json(orient='index')
    return match_json


def main():
    get_data(['MadRice', 'planbe'])


if __name__ == "__main__":
    main()