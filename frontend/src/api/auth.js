import client from './client';

export const login = (data) => client.post('/auth/login', data);
export const register = (data) => client.post('/auth/register', data);

export const adminLogin = (data) => client.post('/admin/login', data);
