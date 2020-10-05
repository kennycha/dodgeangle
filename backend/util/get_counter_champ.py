import requests, json, os, time, random, collections
from datetime import datetime
from tqdm import tqdm
import pandas as pd
import numpy as np

# 로컬에서 데이터 로드
DATA_DIR = 'E:/matchData/' # local
MATCH_DIR = os.path.join(DATA_DIR,'matchData_pkl')
MATCH_FILE = os.path.join(MATCH_DIR,'matchData_GOLD_1_100.pkl') # 파일명
CHAMPION_FILE = os.path.join(DATA_DIR, "champion.json")

with open(CHAMPION_FILE, encoding="utf-8") as f:
    champ_data = json.loads(f.read())
champ_key_dict = { int(val["key"]):val["name"] for val in champ_data["data"].values()}

match1 = pd.read_pickle(MATCH_FILE)
match1 = match1.drop_duplicates('gameId') # 중복제거
match1 = match1[match1['gameDuration']>600].reset_index(drop=True) # 다시하기 제거

def champ_most_lane(data):
    cnt = 0
    length = len(data)
    champs = { champ_key_dict[c]:{'role':{'NONE':0,'DUO_CARRY':0, 'SOLO':0,'DUO_SUPPORT':0,'DUO':0},'lane':{'TOP':0,'MIDDLE':0,'JUNGLE':0,'DUO_CARRY':0, 'DUO_SUPPORT':0}}for c in list(champ_key_dict.keys())}
    for i in range(len(dtat['participants'])):
        for m in data['participants'][i]:
            if m['timeline']['lane'] != 'NONE': 
                champs[champ_key_dict[m['championId']]]['role'][m['timeline']['role']]+=1
                if m['timeline']['lane'] != 'BOTTOM': 
                    champs[champ_key_dict[m['championId']]]['lane'][m['timeline']['lane']]+=1
                    cnt+=1
                elif m['timeline']['role'] in ['DUO_CARRY', 'DUO_SUPPORT']:
                    champs[champ_key_dict[m['championId']]]['lane'][m['timeline']['role']]+=1
                    cnt+=1
    print(f'총 챔프 수: {length*10}, 적용된 챔프 수: {cnt}')

    champion_main_lane = dict()
    for c in champs.keys():
        count = collections.Counter(champs[c]['lane']).most_common(5)
        champion_main_lane[c] = { pos:most[0] for pos,most in zip(['main_pos', 'sub_pos'],count) if np.mean([cnt for key,cnt in count])<most[1] }
    champion_main_lane
    # 횟수가 평균 이상일 경우 부 포지션 생성
    return champion_main_lane


# 골드차이와 상대 라인챔프 구하기
new_match = []
data = [] 
lane = ['TOP','JUNGLE', 'MIDDLE','DUO_CARRY','DUO_SUPPORT']
def lane_correction(line_list): # 게임에서 한 팀의 라인이 모두 배정되있는가
    if collections.Counter(line_list)['DUO_SUPPORT'] == 1 and collections.Counter(line_list)['DUO_CARRY'] ==1  and collections.Counter(line_list)['TOP'] == 1 and collections.Counter(line_list)['MIDDLE'] == 1 and collections.Counter(line_list)['JUNGLE'] == 1: # 좋은 방법 찾습니다.
        return True
    else:
        return False
for i in range(len(match1['participants'])): 
 
    team1 = {m['championId']:(m['timeline']['lane'], m['timeline']['goldPerMinDeltas']) if m['timeline']['lane'] != 'BOTTOM' else (m['timeline']['role'], m['timeline']['goldPerMinDeltas']) for m in match1['participants'][i][:5]}
    team2 = {m['championId']:(m['timeline']['lane'], m['timeline']['goldPerMinDeltas']) if m['timeline']['lane'] != 'BOTTOM' else (m['timeline']['role'], m['timeline']['goldPerMinDeltas']) for m in match1['participants'][i][5:]}
  
    
    if lane_correction([val[0] for val in team1.values()]) and lane_correction([val[0] for val in team2.values()]):    
# 너무 버려지는게 많으면 보충할 거임 -> 반 정도 버려짐
      
        team2_lane = {val[0]:key for key,val in team2.items()}
        for m in match1['participants'][i][:5]:
            m['opponentChamp'] = team2_lane[team1[m['championId']][0]]
            m['goldDiff'] = { items[0]:int(items[1])-int(val2) for items,val2 in zip(m['timeline']['goldPerMinDeltas'].items(), team2[m['opponentChamp']][1].values())}
            m['lane'] = team1[m['championId']][0]
        team1_lane = {val[0]:key for key,val in team1.items()}
        for m in match1['participants'][i][5:]:
            m['opponentChamp'] = team1_lane[team2[m['championId']][0]]
            m['goldDiff'] = { items[0]:int(items[1])-int(val2) for items,val2 in zip(m['timeline']['goldPerMinDeltas'].items(), team1[m['opponentChamp']][1].values())}
            m['lane'] = team2[m['championId']][0]
        new_match+=match1['participants'][i]
        

pd.DataFrame(new_match)

for m in new_match:
    # 이것뿐만 아니라 듀오가 두명일 경우도 있음 -> 전체 포지션 개수를 구하자
    data.append([
                m['participantId'],
                m['championId'],
                champ_key_dict[m['championId']],
                m['stats']['win'],
                m['stats']['kills'],
                m['stats']['deaths'], 
                m['stats']['assists'],
                m['timeline']['role'],
                m['lane'],
                m['opponentChamp'],
                champ_key_dict[m['opponentChamp']],
                m['timeline']['xpDiffPerMinDeltas'],
                m['timeline']['csDiffPerMinDeltas'],
                m['goldDiff']
                ]) 
counter_df = pd.DataFrame(data,columns=('participantId','championId','championName','win','K','D','A','role','lane','opponentChamp','opponentChampName','timeline_xpDiffPerMin', 'csDiffPerMinDeltas','goldDiffPerMinDeltas'))


# 0행렬 생성
champs_mat = np.zeros([150,150])
win_cnt_mat = np.zeros([150,150])
champs_columns = { c:idx for idx,c in enumerate(champ_key_dict.keys())}
for _, row in counter_df[['championId','opponentChamp','goldDiffPerMinDeltas','win']].iterrows():
    if row[2]['10-20']<0:
        champs_mat[champs_columns[row[0]]][champs_columns[row[1]]]-=1
    elif row[2]['10-20']>0:
        champs_mat[champs_columns[row[0]]][champs_columns[row[1]]]+=1
    if row[3]:
        win_cnt_mat[champs_columns[row[0]]][champs_columns[row[1]]]+=1
    elif row[3] == False:
        win_cnt_mat[champs_columns[row[1]]][champs_columns[row[0]]]+=1
counter_champ_frame = pd.DataFrame(champs_mat,columns = (champ_key_dict.keys()),index=(champ_key_dict.keys()))
win_cnt_frame = pd.DataFrame(win_cnt_mat, columns = (champ_key_dict.keys()), index=(champ_key_dict.keys()))

# 챔피언별 승률
win_rate_mat = np.zeros([150,150])
for i in range(len(win_cnt_mat)):
    for j in range(len(win_cnt_mat)):
        if i!=j and win_cnt_mat[i][j]+win_cnt_mat[j][i]:
            win_rate_mat[i][j] = round(win_cnt_mat[i][j]/(win_cnt_mat[i][j]+win_cnt_mat[j][i])*100,1)
np.save('champion/fixtures/win_rate_mat',win_rate_mat)

# counter champ 3개 추출
counter_champ_three = []
for idx,row in counter_champ_frame.iterrows():
    counter_champs = list(row.sort_values().keys()[:3])
    counter_champ_three.append([counter_champs,[win_rate_mat[champs_columns[idx]][champs_columns[c]] for c in counter_champs]])

    
counter_champ_three_frame = pd.DataFrame(counter_champ_three,index=champ_key_dict.keys()) 
pd.to_pickle(counter_champ_three_frame,'champion/fixtures/counter_champs.pkl')   