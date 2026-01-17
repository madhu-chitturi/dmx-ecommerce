import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get('/products');
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem('dmx_admin_token');
    await axios.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Products</h1>
        <a href="/admin/products/new" className="px-4 py-2 bg-primary text-white text-sm rounded">
          Add New Product
        </a>
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg p-3 flex items-center gap-4">
            <img src={p.image} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-gray-600">₹{p.price}</p>
            </div>
            <button
              onClick={() => deleteProduct(p._id)}
              className="text-red-500 text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
