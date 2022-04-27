import { LoginRequest, ProfileRequest, RegisterRequest, User } from 'features/auth/authModels';
import axiosApi, { DataResponse } from './axiosApi';

const login = async (body: LoginRequest) => {
  return axiosApi.post<DataResponse<string>>('auth/login', body).then((res) => res.data);
};

const register = async (body: RegisterRequest) => {
  return axiosApi.post<DataResponse<User>>('auth/register', body).then((res) => res.data);
};

const logout = async () => {
  return axiosApi.post('auth/logout').then((res) => res.data);
};

const getCurrentUser = async () => {
  return axiosApi.get<DataResponse<User>>('auth/user').then((res) => res.data);
};

const updateProfile = async (body: ProfileRequest) => {
  return axiosApi.put<DataResponse<User>>('auth/update-profile', body).then((res) => res.data);
};

const isAuthenticated = async () => {
  return axiosApi.get<DataResponse<boolean>>('auth/is-auth').then((res) => res.data);
};

const authApi = {
  login,
  register,
  getCurrentUser,
  logout,
  isAuthenticated,
  updateProfile
};

export default authApi;
