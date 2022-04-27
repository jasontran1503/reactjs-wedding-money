export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileRequest {
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface User {
  createdAt: string;
  email: string;
  password: string;
  updatedAt: string;
  username: string;
  _id: string;
}
