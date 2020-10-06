import client from './client';

export const getDodgeAngle = (params) =>
  client.get(`api/v1/dodgeangle/?${params}`);
