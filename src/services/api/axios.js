import axios from 'axios';
import { ClientError } from '../../utils/exceptions';

const API_URL = process.env.VUE_APP_API_URL;
const API_PORT = process.env.VUE_APP_API_PORT;
const API_URL_PORT = `${API_URL}:${API_PORT}`;

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 5000,
  validateStatus: (status) => status < 400,
});

const _axiosCall = async (axiosInst, url, { query, ...requestOptions }) =>
  axiosInst({
    method: requestOptions.method,
    url: encodeQueryParams(`${API_URL_PORT}${url}`, query).toString(),
    data: requestOptions.body,
    headers: requestOptions.headers,
  });

const apiCall = async (...args) => {
  try {
    const response = await _axiosCall(axiosInstance, ...args);
    if (response.status >= 200 && response.status < 400) {
      return response;
    }
    return null;
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          throw new ClientError(
            error.response.data.message,
            error.response.data.errors,
            error.response.status,
          );
        } else {
          throw error;
        }
      } else {
        throw new Error('Ocurrio un Error, por favor intenta nuevamente.');
      }
    } else {
      throw new Error('Ocurrio un Error, por favor intenta nuevamente.');
    }
  }
};

const encodeQueryParams = (url, query) => {
  const encodeURL = new URL(url);
  // ToDo: Have to agree how to encode null
  if (query) {
    Object.entries(query).forEach(([k, v]) =>
      encodeURL.searchParams.append(k, v),
    );
  }
  return encodeURL;
};

export const unAxiosCall = (url, requestOptions) =>
  apiCall(url, requestOptions);

export const authAxiosCall = async (cognitoId, url, requestOptions) => {
  return apiCall(url, {
    ...requestOptions,
    headers: {
      ...requestOptions.headers,
      'X-Cognito-Id': cognitoId,
    },
  });
};
