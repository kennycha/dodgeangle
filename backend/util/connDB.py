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

    with open('champion/fixtures/champion.json', encoding='utf-8') as f:
        file_data = json.load(f)
    
    insert_list = ['key', 'name', 'image', 'tags']
    for data in file_data:
        temp = {}
        tdata = file_data[data]
        for i in insert_list:
            if i == 'image':
                temp[i] = tdata[i]['full']
            elif i == 'key':
                temp['id'] = int(tdata[i])
            else:
                temp[i] = tdata[i]
        
        collection.insert(temp)

    client.close()


def main():
    # client = db_client()
    # print(client.list_database_names())
    set_data()


if __name__ == "__main__":
    main()