import api from '../api';
import { ApiError } from '../errors';

import { AUTH_DATA_KEY } from '../config';

const INITIAL_STATE = {
  token: null,
  expires: null,
};

let authData;

(() => {
  const data = localStorage.getItem(AUTH_DATA_KEY);
  if (data) {
    try {
      authData = JSON.parse(data);
    } catch (e) {
      authData = INITIAL_STATE;
    }
  } else {
    authData = INITIAL_STATE;
  }
})();

const getTokenData = (token) => {
  try {
    const [, payload] = token.split('.');
    return JSON.parse(atob(payload));
  } catch (e) {
    return {};
  }
};

export const getToken = () => authData && authData.token;

const AuthProvider = {
  login: async ({ username, password }) => {
    const { token } = await api.auth.login({ username, password });
    const tokenData = getTokenData(token);

    authData = {
      token,
      expires: tokenData.exp,
      tokenData,
    };

    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData));
  },
  register: async ({
    username, email, password, confirmPassword,
  }) => {
    const { token } = await api.auth.register({
      username,
      email,
      password,
      confirmPassword,
    });
    const tokenData = getTokenData(token);

    authData = {
      token,
      expires: tokenData.exp,
      tokenData,
    };

    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData));
  },
  logout: async () => {
    localStorage.removeItem(AUTH_DATA_KEY);
    authData = {};
    await api.auth.logout().catch(() => {});
  },
  checkAuth: async () => {
    if (authData.token && authData.expires > Date.now() / 1000) {
      return Promise.resolve();
    }
    return Promise.reject();
  },
  checkError: async (error) => {
    if (error instanceof ApiError && error.status === 401) {
      localStorage.removeItem(AUTH_DATA_KEY);
      authData = {};
      return Promise.reject();
    }
    return '';
  },
  getPermissions: async () => {},
};

export default AuthProvider;
