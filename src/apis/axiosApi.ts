import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface DataResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const axiosApi = axios.create({
  baseURL: 'localhost:5000/api/',
  // baseURL: 'https://wedding-money.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosApi.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        // navigate('/register');
        break;
      case 404:
        // case 403:
        // navigate('/');
        break;
    }
    return Promise.reject(error.response.data);
  }
);

export default axiosApi;
