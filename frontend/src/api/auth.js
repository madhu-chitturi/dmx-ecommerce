import axios from './axios';

export const login = (payload) => {
  return axios.post('/auth/login', payload);
};

export const register = (payload) => {
  return axios.post('/auth/register', payload);
};

export const initAdmin = () => {
  return axios.get('/admin/init');
};
