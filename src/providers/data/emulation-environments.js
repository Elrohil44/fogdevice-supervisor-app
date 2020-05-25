import api from '../../api';

import { getToken } from '../auth';

export const getList = async (params) => {
  const result = await api.emulationEnvironments.fetchEmulationEnvironments(getToken(), params);
  return {
    ...result,
    data: result.data.map((entity) => ({ ...entity, id: entity._id })),
    validUntil: new Date(Date.now() + 60 * 1000),
  };
};

export const getOne = async ({ id }) => {
  const result = await api.emulationEnvironments.fetchEmulationEnvironment(getToken(), { id });
  return {
    data: {
      ...result,
      id: result._id,
    },
    validUntil: new Date(Date.now() + 60 * 1000),
  };
};

export const create = async ({ data }) => {
  const result = await api.emulationEnvironments.createEmulationEnvironment(getToken(), data);
  return {
    data: {
      ...result,
      id: result._id,
    },
  };
};

export const update = async ({ id, data }) => {
  const result = await api.emulationEnvironments
    .updateEmulationEnvironment(getToken(), { id, data });
  return {
    data: {
      ...result,
      id: result._id,
    },
  };
};

export default {
  getList,
  getOne,
  create,
  update,
};
