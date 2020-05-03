import { stringify } from 'qs';

import { ApiError } from '../errors';
import { stripUndefined } from '../utils';

const { API_URL } = require('../config');

const handleResponse = async ({ response, expectedStatus, description }) => {
  if (response.status === expectedStatus) {
    if (response.status === 204) {
      return '';
    }
    return response.json();
  }

  const contentType = response.headers.get('content-type');
  let code;
  let message;
  if (contentType && contentType.includes('application/json')) {
    try {
      ({ code, message } = await response.json());
    } catch (e) {
      throw new ApiError({
        message: `${description || 'Request'} failed. Malformed JSON entity`,
        status: response.status,
      });
    }
    if (code || message) {
      throw new ApiError({ status: response.status, code, message });
    }
  }
  throw new ApiError({
    message: `${description || 'Request'} failed with status code ${response.status}.`,
    status: response.status,
  });
};

export const fetchJsonApi = async ({
  method,
  endpoint,
  expectedStatus,
  body,
  headers = {},
  description,
  query = {},
}) => {
  const requestHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };

  const queryString = typeof query === 'string'
    ? query
    : stringify(stripUndefined(query));

  // this is necessary for uploads, null value cause browser to generate this header
  if (requestHeader['Content-Type'] === null) {
    delete requestHeader['Content-Type'];
  }

  const url = `${API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    method,
    headers: requestHeader,
    body: body && (body instanceof FormData ? body : JSON.stringify(body)),
    credentials: 'include',
  });

  return handleResponse({
    response,
    expectedStatus,
    description,
  });
};

export const fetchAuthorizedJsonApi = async ({
  token,
  method,
  endpoint,
  expectedStatus,
  body,
  headers = {},
  description,
  query = {},
}) => fetchJsonApi({
  method,
  endpoint,
  expectedStatus,
  body,
  headers: {
    ...(headers || {}),
    Authorization: `Bearer ${token}`,
  },
  description,
  query,
});

export const fetchAuthorizedUploadJsonApi = async ({
  token,
  method,
  endpoint,
  expectedStatus,
  body = {},
  files,
  headers = {},
  description,
  query = {},
}) => {
  const data = new FormData();
  Object.keys(body).forEach((key) => {
    data.append(key, JSON.stringify(body[key]));
  });
  Object.keys(files).forEach((file) => data.append(file, files[file]));
  return fetchAuthorizedJsonApi({
    token,
    method,
    endpoint,
    expectedStatus,
    body: data,
    headers: {
      ...headers,
      'Content-Type': null,
    },
    description,
    query,
  });
};
