import json
from pymongo import MongoClient
from decouple import config
import pandas as pd
import numpy as np

def db_client():
    client = MongoClient(
        host = config('MONGO_INITDB_ROOT_HOST'),
        port = 27017,
        username = config('MONGO_INITDB_ROOT_USERNAME'),
        password = config('MONGO_INITDB_ROOT_PASSWORD'),
        authSource='admin',
        authMechanism='SCRAM-SHA-1'
        )
    return client


def set_data():
    client = db_client()
    collection = client.normal.champion_champion

    with open('champion/fixtures/rune_champion.json', encoding='utf-8') as f:
        file_data = json.load(f)

    with open('champion/fixtures/runes.json', encoding='utf-8') as f:
        runes = json.load(f)

    for data in file_data:
        del data['_id']
        rune = [x for x in runes if x['id'] == data['id']]
        data['rune'] = rune
        collection.insert(data)
    
    client.close()

def update_data():
    client = db_client()
    collection = client.normal.champion_champion
    
    counter_data = pd.read_pickle('champion/fixtures/counter_champs.pkl')
    for i in range(len(counter_data)):
        collection.update( 
            {'id': int(counter_data.iloc[i].name) }, 
            {'$set': 
                {'counter':[ {'id':key,'win_rate':win_rate} for key, win_rate in zip(counter_data.iloc[i][0],counter_data.iloc[i][1])] }},  upsert=True )
        
def main():
    # client = db_client()
    # print(client.list_database_names())
    set_data()
    # update_data()


if __name__ == "__main__":
    main()