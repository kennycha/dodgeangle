import json
from pymongo import MongoClient
from decouple import config

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

    with open('champion/fixtures/dummy.json', encoding='utf-8') as f:
        file_data = json.load(f)

    with open('champion/fixtures/position.json', encoding='utf-8') as f:
        pos_data = json.load(f)
    
    insert_list = ['id', 'name', 'image', 'pos', 'counter']

    temp = {}
    for data in file_data:
        del data['_id']
        position = [d['pos'] for d in pos_data if d['name'] == data['name']]
        data['pos'] = position[0]
        temp[data['name']] = data

    index = sorted(temp)
    for i in range(len(index)):
        collection.insert(temp[index[i]])
    
    client.close()


def main():
    # client = db_client()
    # print(client.list_database_names())
    set_data()


if __name__ == "__main__":
    main()