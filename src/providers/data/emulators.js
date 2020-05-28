import api from '../../api';

import { getToken } from '../auth';

export const getList = async (params) => {
  const result = await api.emulators.fetchEmulators(getToken(), params);
  return {
    ...result,
    data: result.data.map((entity) => ({ ...entity, id: entity._id })),
    validUntil: new Date(Date.now() + 60 * 1000),
  };
};

export const getOne = async ({ id }) => {
  const result = await api.emulators.fetchEmulator(getToken(), { id });
  return {
    data: {
      ...result,
      id: result._id,
    },
    validUntil: new Date(Date.now() + 60 * 1000),
  };
};

export const create = async ({ data }) => {
  const result = await api.emulators.createEmulator(getToken(), data);
  return {
    data: {
      ...result,
      id: result._id,
    },
  };
};

export const update = async ({ id, data }) => {
  const result = await api.emulators.updateEmulator(getToken(), { id, data });
  return {
    data: {
      ...result,
      id: result._id,
    },
  };
};

export const getMany = async () => getList({});

export default {
  getList,
  getOne,
  create,
  update,
  getMany,
};
