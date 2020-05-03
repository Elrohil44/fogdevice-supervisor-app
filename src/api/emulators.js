import { fetchAuthorizedJsonApi } from './abstract';

export const fetchEmulators = async (token, params = {}) => fetchAuthorizedJsonApi({
  method: 'GET',
  endpoint: '/emulators',
  expectedStatus: 200,
  query: params,
  token,
  description: 'Fetching emulators',
});

export const fetchEmulator = async (token, { id }) => fetchAuthorizedJsonApi({
  method: 'GET',
  endpoint: `/emulators/${id}`,
  expectedStatus: 200,
  token,
  description: 'Fetching emulator',
});

export const createEmulator = async (token, body) => fetchAuthorizedJsonApi({
  method: 'POST',
  endpoint: '/emulators',
  expectedStatus: 201,
  body,
  token,
  description: 'Creating emulator',
});

export const updateEmulator = async (token, { id, data }) => fetchAuthorizedJsonApi({
  method: 'PUT',
  endpoint: `/emulators/${id}`,
  expectedStatus: 200,
  body: data,
  token,
  description: 'Updating emulator',
});

export default {
  fetchEmulators,
  fetchEmulator,
  createEmulator,
  updateEmulator,
};
