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
    collection = client.normal.champion_rune

    with open('champion/fixtures/rune.json', encoding='utf-8') as f:
        file_data = json.load(f)

    # with open('champion/fixtures/position.json', encoding='utf-8') as f:
    #     pos_data = json.load(f)
    
    # insert_list = ['id', 'name', 'image', 'pos', 'counter']
    
    # temp = {}
    # for data in file_data:
    #     del data['_id']
    #     position = [d['pos'] for d in pos_data if d['name'] == data['name']]
    #     data['pos'] = position[0]
    #     temp[data['name']] = data
    for data in file_data:
        collection.insert(data)
    # index = sorted(temp)
    # for i in range(len(index)):
    #     collection.insert(temp[index[i]])
    
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