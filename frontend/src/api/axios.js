import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('dmx_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
