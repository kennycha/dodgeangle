import pickle
from scipy import stats

_file = open('util/troll_module.pkl', 'rb')
troll_module = pickle.load(_file)

def get_troll_score(champ_id, kda, dpm, gpm):
    '''이번 경기 성적이 해당티어(골드1) & 챔피언 중 상위 몇%인지 백분율'''

    data = [(kda, dpm, gpm)]
    pre_data = troll_module[champ_id]['pre_scaler'].transform(data)
    pca_data = troll_module[champ_id]['pca'].transform(pre_data)
    scaled_data = troll_module[champ_id]['post_scaler'].transform(pca_data)

    # 정규분포에서 누적분포함수(cumulative distribution function) 사용하여 백분율 환산
    return (1 - stats.norm(0, 1).cdf(scaled_data)[0][0]) * 100

def troll_preprocess(m, p_num):
    '''매치데이터와 플레이어 순서를 입력받아 트롤지수 계산에 필요한 데이터 추출'''

    for player in m['participants']:
        if player['participantId'] == p_num:
            champ_id = player['championId']
            kills = player['stats']['kills']
            deaths = int(player['stats']['deaths'])
            deaths = 1 if deaths == 0 else deaths
            assists = player['stats']['assists']
            damage = player['stats']['totalDamageDealt']
            gold = player['stats']['goldEarned']
            break
    
    duration = m['gameDuration'] / 60
    
    kda = (kills + assists) / deaths
    dpm = damage / duration
    gpm = gold / duration

    return (champ_id, kda, dpm, gpm)

def main():
    score = get_troll_score(266, 0.2857142857142857, 50303/20, 5342/20)
    print(score) # 91.42267624213534

if __name__ == "__main__":
    main()