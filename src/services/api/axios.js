import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL
const API_PORT = process.env.VUE_APP_API_PORT

const API_URL_PORT = `${API_URL}:${API_PORT}`;
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 5000,
  validateStatus: status => status < 400,
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
    } else {
      return
    }
    return null;
  } catch (error) {
    console.log(error)
    throw error
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

export const unAxiosCall = (url, requestOptions) => {
  return apiCall(url, requestOptions);
};

export const authAxiosCall = async (url, requestOptions) => {
  const cognitoId = await getCognitoId();
  return manualAuthAxiosCall(cognitoId, url, requestOptions);
};

export const manualAuthAxiosCall = async (cognitoId, url, requestOptions) => {
  return apiCall(url, {
    ...requestOptions,
    headers: {
      ...requestOptions.headers,
      'X-Cognito-Id': cognitoId
    },
  });
};
