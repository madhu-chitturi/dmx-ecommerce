import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("dmx_admin_token");

  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Products</h1>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="px-4 py-2 bg-primary text-white text-sm rounded"
        >
          Add New Product
        </button>
      </div>

      <div className="space-y-3">
        {products.map(p => (
          <div key={p._id} className="flex items-center justify-between border p-2 rounded">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-500">{p.category}</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="px-2 py-1 text-xs bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
