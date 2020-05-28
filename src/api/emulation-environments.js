import { fetchAuthorizedJsonApi } from './abstract';

export const fetchEmulationEnvironments = async (token, params = {}) => fetchAuthorizedJsonApi({
  method: 'GET',
  endpoint: '/emulation-environments',
  expectedStatus: 200,
  query: params,
  token,
  description: 'Fetching emulation environment',
});

export const fetchEmulationEnvironment = async (token, { id }) => fetchAuthorizedJsonApi({
  method: 'GET',
  endpoint: `/emulation-environments/${id}`,
  expectedStatus: 200,
  token,
  description: 'Fetching emulation environment',
});

export const createEmulationEnvironment = async (token, body) => fetchAuthorizedJsonApi({
  method: 'POST',
  endpoint: '/emulation-environments',
  expectedStatus: 201,
  body,
  token,
  description: 'Creating emulation environment',
});

export const updateEmulationEnvironment = async (token, { id, data }) => fetchAuthorizedJsonApi({
  method: 'PUT',
  endpoint: `/emulation-environments/${id}`,
  expectedStatus: 200,
  body: data,
  token,
  description: 'Updating emulation environment',
});

export const startEmulation = async (token, { id }) => fetchAuthorizedJsonApi({
  method: 'GET',
  endpoint: `/emulation-environments/${id}/start`,
  expectedStatus: 204,
  token,
  description: 'Starting emulation',
});

export const stopEmulation = async (token, { id }) => fetchAuthorizedJsonApi({
  method: 'GET',
  endpoint: `/emulation-environments/${id}/stop`,
  expectedStatus: 204,
  token,
  description: 'Starting emulation',
});

export default {
  fetchEmulationEnvironments,
  fetchEmulationEnvironment,
  createEmulationEnvironment,
  updateEmulationEnvironment,
  startEmulation,
  stopEmulation,
};
