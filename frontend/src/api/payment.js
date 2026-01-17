import client from './client';

export const createOrder = (data, token) =>
  client.post('/payments/create', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const verifyPayment = (data, token) =>
  client.post('/payments/verify', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
