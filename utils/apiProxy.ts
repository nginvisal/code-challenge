import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create();

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response.data;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error.response ? error.response.data : error);
  },
);

export const apiProxy = (options: AxiosRequestConfig) => {
  return instance({
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
    timeout: 30000
  });
};

export const configSessiontoken = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};
