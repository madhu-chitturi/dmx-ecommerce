import client from './client';

export const fetchProducts = () => client.get('/products');
export const fetchProduct = (slug) => client.get(`/products/${slug}`);
export const addProduct = (formData, token) =>
  client.post('/products', formData, { headers: { Authorization: `Bearer ${token}` } });
export const updateProduct = (id, formData, token) =>
  client.put(`/products/${id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
export const deleteProduct = (id, token) =>
  client.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
