import axios from './axios';

export const createOrder = (payload) => {
  return axios.post('/payments/order', payload);
};

export const verifyPayment = (payload) => {
  return axios.post('/payments/verify', payload);
};
