import { authAxiosCall } from './axios';

export const saveProfile = async (cognitoId, data) => {
  return authAxiosCall(cognitoId, '/dev/profile', {
    method: 'PATCH',
    body: data,
  });
};

export const getProfile = async (cognitoId) => {
  const res = await authAxiosCall(cognitoId, '/dev/profile', {
    method: 'GET',
  });
  return res.data;
};
