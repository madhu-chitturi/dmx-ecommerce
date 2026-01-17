import { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../../api/products';
import { useAuthStore } from '../../store/authStore';

export default function AdminProducts() {
  const [list, setList] = useState([]);
  const adminToken = useAuthStore((s) => s.adminToken);

  const load = () => {
    fetchProducts().then((res) => setList(res.data));
  };

  useEffect(load, []);

  const del = async (id) => {
    await deleteProduct(id, adminToken);
    load();
  };

  return (
    <div className="p-3 max-w-3xl mx-auto">
      <h1 className="font-semibold text-lg mb-3">Admin Products</h1>

      <a
        href="/admin/products/add"
        className="inline-block bg-primary text-white px-3 py-1 rounded-md text-sm mb-3"
      >
        Add Product
      </a>

      <div className="space-y-3">
        {list.map((p) => (
          <div key={p._id} className="border border-border p-3 rounded-md flex justify-between">
            <div>
              <div className="font-medium text-sm">{p.title}</div>
              <div className="text-primary text-xs">₹{p.price}</div>
            </div>
            <div className="flex gap-2 text-xs">
              <a
                href={`/admin/products/edit/${p._id}`}
                className="text-blue-600 underline"
              >
                Edit
              </a>
              <button onClick={() => del(p._id)} className="text-red-600 underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
