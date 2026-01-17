import { useEffect, useState } from 'react';
import { fetchProducts, updateProduct } from '../../api/products';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function AdminEditProduct() {
  const { id } = useParams();
  const adminToken = useAuthStore((s) => s.adminToken);

  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchProducts().then((res) => {
      const p = res.data.find((x) => x._id === id);
      if (p) setForm(p);
    });
  }, [id]);

  const change = (k, v) => setForm({ ...form, [k]: v });

  const submit = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('image', file);

    await updateProduct(id, fd, adminToken);
    window.location.href = '/admin/products';
  };

  if (!form.title) return null;

  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="font-semibold text-lg mb-3">Edit Product</h1>

      {['title','category','description','price','mrp','stock'].map((f) => (
        <input
          key={f}
          placeholder={f}
          value={form[f] || ''}
          className="border p-2 w-full mb-2 text-sm"
          onChange={(e) => change(f, e.target.value)}
        />
      ))}

      <input
        type="file"
        className="mb-3 text-sm"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="bg-primary text-white w-full py-2 rounded-md text-sm"
        onClick={submit}
      >
        Update
      </button>
    </div>
  );
}
