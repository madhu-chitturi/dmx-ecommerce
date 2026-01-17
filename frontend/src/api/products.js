import axios from './axios';

export const getProducts = () => {
  return axios.get('/products');
};

export const getProduct = (slug) => {
  return axios.get(`/products/${slug}`);
};

export const createProduct = (data, token) => {
  return axios.post('/products', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
