import json
from pymongo import MongoClient
from decouple import config

def db_client():
    client = MongoClient(
        host = config('DJANGO_CORS_ORIGIN_WHITELIST'),
        port = 27017,
        username = config('MONGO_INITDB_ROOT_USERNAME'),
        password = config('MONGO_INITDB_ROOT_PASSWORD'),
        authSource='admin',
        authMechanism='SCRAM-SHA-1'
        )
    return client

def main():
    client = db_client()
    collection = client.normal_db.champion

    with open('champion/dummy/champion.json', encoding='utf-8') as f:
        file_data = json.load(f)
    
    insert_list = ['key', 'name', 'image', 'tags']

    for data in file_data:
        temp = {}
        tdata = file_data[data]
        for i in insert_list:
            if i == 'image':
                temp[i] = tdata[i]['full']
            else:
                temp[i] = tdata[i]
        
        collection.insert(temp)

    client.close()

if __name__ == "__main__":
    main()