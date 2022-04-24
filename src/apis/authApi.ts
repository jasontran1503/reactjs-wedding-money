import { LoginRequest, RegisterRequest } from 'features/auth/authModel';
import axiosApi from './axiosApi';

const login = (body: LoginRequest) => {
  return axiosApi.post('auth/login', body);
};

const register = (body: RegisterRequest) => {
  return axiosApi.post('auth/register', body);
};

const logout = () => {
  return axiosApi.post('auth/logout');
};

const getCurrentUser = () => {
  return axiosApi.get('auth/user');
};

const isAuthenticated = () => {
  return axiosApi.get('auth/is-auth');
};

const authApi = {
  login,
  register,
  getCurrentUser,
  logout,
  isAuthenticated
};

export default authApi;
