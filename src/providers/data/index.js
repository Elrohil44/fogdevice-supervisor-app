const emulators = require('./emulators');

const providers = {
  emulators,
};

const getProviderForCallType = (callType) => async (resource, params) => {
  const provider = providers[resource];

  if (!provider || !provider[callType]) {
    throw new Error(`There is no data provider registered for ${callType} for ${resource}`);
  }

  return provider[callType](params);
};

const callTypes = [
  'getList',
  'getOne',
  'getMany',
  'getManyReference',
  'create',
  'update',
  'updateMany',
  'delete',
  'deleteMany',
];

const DataProvider = callTypes.reduce((provider, callType) => ({
  ...provider,
  [callType]: getProviderForCallType(callType),
}), {});

export default DataProvider;
