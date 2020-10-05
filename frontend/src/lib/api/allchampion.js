import client from './client';

export const getAllChampion = () => client.get('api/v1/allchampion');
