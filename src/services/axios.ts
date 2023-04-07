import { appConfig } from '@configs/app';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: appConfig.apiURL,
});

axiosInstance.interceptors.response.use(function (response) {
  return response.data;
});

export { axiosInstance as client };
