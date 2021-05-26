import { unAxiosCall } from './axios';

export const createAccount = async (data) =>
  unAxiosCall('/dev/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const confirmCode = async (data, cognitoId) =>
  unAxiosCall('/dev/verify/email', {
    method: 'POST',
    body: data,
    headers: {
      'X-Cognito-Id': cognitoId,
    },
  });

export const resendCode = async (cognitoId) =>
  unAxiosCall('/dev/verify/email/resend', {
    method: 'POST',
    headers: {
      'X-Cognito-Id': cognitoId,
    },
  });
