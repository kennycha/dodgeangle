import json
import pandas as pd
import numpy as np

df = pd.read_pickle('gold/rune_data_all.pkl')
df = df.sort_values(by=['id'], axis=0)

key = np.array(df['id'].drop_duplicates())

col = (
#     'id',
    'primary',
    'primary1',
    'primary2',
    'primary3',
    'primary4',
    'sub',
    'sub1',
    'sub2',
    'stat1',
    'stat2',
    'stat3'
    )

stat = {
    "stat1": [
        {
            "id": 5008,
            "number": 611
        },
        {
            "id": 5005,
            "number": 612
        },
        {
            "id": 5007,
            "number": 613
        }
    ],
    "stat2" : [
        {
            "id": 5008,
            "number": 621
        },{
            "id": 5002,
            "number": 622
        },{
            "id": 5003,
            "number": 623
        }
    ],
    "stat3" : [
        {
            "id": 5001,
            "number": 631
        },{
            "id": 5002,
            "number": 632
        },{
            "id": 5003,
            "number": 633
        }
    ]
}

primary_rune = []
for k in key:
    temp = df[df['id'].isin([k])]
    t = {}
    t['id'] = k
    for c in col:
        v = temp[c].value_counts().head(3).keys()
        t[c] = v
    primary_rune.append(t)

with open('rune_champion.json','w', encoding='UTF-8') as f:
    json.dump(primary_rune, f, indent=2, ensure_ascii=False)

with open('rune.json', encoding="utf-8") as f:
    rune_data = json.loads(f.read())

new_rune_champion = []
for r in primary_rune:
    temp = {}
    temp['id'] = r['id']
    for c in col:
        idx = [x['number'] for x in rune_data for t in r[c] if x['id'] == t]
        if not idx:
            idx = [x['number'] for x in stat[c] for t in r[c] if x['id'] == t]
        temp[c] = idx
    new_rune_champion.append(temp)

with open('new_rune_champion.json', encoding="utf-8") as f:
    rune = json.loads(f.read())

data = []
for r in rune:
    temp = {}
    temp['id'] = r['id']
    idx = ''
    sub = ['0','0','0','0']
    for c in col:
        t = str(r[c])
        if c == 'primary':
            idx = t[0]
        elif c == 'sub':
            temp['main'] = idx
            sub[0] = t[0]
        elif c == 'stat1':
            temp['sub'] = ''.join(sub)
            idx = t[-1]
        elif c[:3] == 'sub':
            sub[int(t[1])-1] = t[-1]
        else:
            idx += t[-1]
    temp['status'] = idx
    data.append(temp)

with open('runes.json','w', encoding='UTF-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)