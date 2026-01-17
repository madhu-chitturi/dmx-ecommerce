import { useState } from 'react';
import axios from '../../api/axios';

export default function AdminAddProduct() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('detergent');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const upload = async (file) => {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
      { method: 'POST', body: form }
    );

    const data = await res.json();
    setImage(data.secure_url);
  };

  const submit = async () => {
    const token = localStorage.getItem('dmx_admin_token');

    await axios.post('/products', {
      title,
      slug,
      price: Number(price),
      category,
      description,
      image,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    window.location.href = '/admin/products';
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-3">
      <h1 className="text-xl font-semibold">New Product</h1>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      />

      <input
        placeholder="Slug"
        onChange={(e) => setSlug(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      />

      <input
        placeholder="Price"
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      />

      <select
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      >
        <option value="detergent">Detergent</option>
        <option value="dishwash">Dishwash</option>
        <option value="handwash">Handwash</option>
        <option value="floor">Floor Cleaner</option>
      </select>

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => upload(e.target.files[0])}
        className="border p-2 w-full rounded text-sm"
      />

      {image && (
        <img src={image} className="w-32 h-32 rounded object-cover" />
      )}

      <button
        onClick={submit}
        className="w-full py-2 bg-primary text-white rounded text-sm"
      >
        Save Product
      </button>
    </div>
  );
}
