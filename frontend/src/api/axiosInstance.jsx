import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',

  //timeout implementation
  
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true
  },
});

export const axiosInstance = instance;
