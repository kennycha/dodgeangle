import json, os
import pandas as pd
import numpy as np


DATA_DIR = "util/"
CHAMPION_FILE = os.path.join(DATA_DIR, "champ_key.json")
with open(CHAMPION_FILE, encoding="utf-8") as f:
        champ_key_dict = json.loads(f.read())
# champ_key_dict = { int(val["key"]):val["name"] for val in champ_data["data"].values() }

def test():
    with open('E:/matchData/new_gamedata.json', 'r') as f:
        gamedata = json.load(f)
    result = pd.read_pickle('E:/matchData/test/result2.pkl')
    gamedata_list = []
    gamedata_columns =(
                    'accountID',
                    'gameId',
                    'championId',
                    'championName',
                    'Role',
                    'Lane',
                    'timestamp',
                
    )
    for key, values in gamedata.items():
        for val in values:
            gamedata_list.append([
                key,
                val['gameId'],
                val['champion'],
                champ_key_dict[val['champion']],
                val['role'],
                val['lane'],
                val['timestamp'],
    
            ])
    gamedata_frame = pd.DataFrame(gamedata_list, columns=gamedata_columns)

    # gamedata
    final_frame=pd.merge(gamedata_frame, result, left_on=['accountID','gameId'], right_on=['accountID','gameId']).drop_duplicates(['gameId']).reset_index(drop=True)

    # most lane
    most_lane = final_frame.groupby(['accountID'])['Lane'].value_counts().groupby('accountID').head(1).keys().to_frame(index=False)
    most_lane = ['accountID','MostLane']

    # most champs
    most_champs = final_frame.groupby(['accountID'])['championId'].value_counts().keys()
    champs = dict()
    for key in most_champs:
        if champs.get(key[0],0):
            champs[key[0]][0].append(key[1])
        else:
            champs[key[0]] = [[key[1]]]

    most_champs = pd.DataFrame.from_dict(champs, orient='index',columns=('champs',)).reset_index()


    df = pd.merge(most_lane,most_champs, left_on='accountID', right_on='index').drop_duplicates(['accountID']).reset_index(drop=True)
    df = df.drop('index',axis='columns')

    # 승률 구하기
    win_res = []
    for champ, champ_list, win in zip(final_frame['championId'],final_frame['team100_champs'], final_frame['team100_win']):
        if champ in champ_list[:5] and win == 'Win':
            win_res.append(True)
        elif champ not in champ_list[:5] and win=='Fail':
            win_res.append(True)
        else:
            win_res.append(False)

    final_frame['win']= win_res

    win_rate_data = [] # 오래 걸림
    for champs, accountId in zip(df['champs'],df['accountID']):
        user_frame = final_frame[ final_frame['accountID'] == accountId ]
        test = [round(len(user_frame[(user_frame['championId']==champ) & (user_frame['win'] == True)]) /len(user_frame[user_frame['championId']==champ])*100,2) for champ in champs]
        win_rate_data.append([
            accountId,
            test
        ])
    win_frame = pd.DataFrame(win_rate_data,columns=('accountID','win_rate'))

    fdf = pd.merge(df,win_frame, left_on='accountID', right_on='accountID').drop_duplicates(['accountID']).reset_index(drop=True)

    # 매트릭스 생성
    from scipy.sparse import csr_matrix
    from sklearn.metrics.pairwise import cosine_similarity
    from scipy import sparse

    row = []
    col = []
    data= []
    for champs ,win_rate, i in zip(fdf['champs'],fdf['win_rate'],range(len(fdf['accountID']))):
        for champ, win in zip(champs, win_rate):
            row.append(i)
            col.append(champ)
            data.append(win)

    m = csr_matrix((data, (row, col)))

    similarities = cosine_similarity(m.transpose())
    np.save('./similarities',similarities)

def recommend_champs(champ_ids):
    similarities = np.load('util/similarities.npy')
    ss_list = []
    for champ_id in champ_ids:
        ss= []
        for i in range(1,len(similarities[champ_id])):
            if similarities[champ_id][i]:
                ss.append((i,similarities[champ_id][i]))

        ss.sort(key=lambda x:x[1], reverse=True)
        temp = [key for key, value in ss]
        if temp[0] in ss_list:
            continue
        ss_list.append(temp[0])
    return ss_list