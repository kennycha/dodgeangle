import client from './client';

export const getSummonersInfo = (summoners) =>
  client.get(`api/v1/summoner/${summoners}`);
