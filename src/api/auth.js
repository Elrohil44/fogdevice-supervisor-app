import { fetchJsonApi } from './abstract';

export const logout = async () => fetchJsonApi({
  method: 'GET',
  endpoint: '/auth/logout',
  expectedStatus: '204',
  description: 'Logout',
});

export const login = async ({ username, password }) => fetchJsonApi({
  method: 'POST',
  endpoint: '/auth/login',
  expectedStatus: 200,
  description: 'Login',
  body: { username, password },
});

export const register = async ({
  username, email, password, confirmPassword,
}) => fetchJsonApi({
  method: 'POST',
  endpoint: '/auth/register',
  expectedStatus: 201,
  description: 'Register',
  body: {
    username, email, password, confirmPassword,
  },
});

export default {
  logout,
  login,
  register,
};
