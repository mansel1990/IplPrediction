import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://185.210.144.214:6001',
  timeout: 5000,
});

export default axiosInstance;
