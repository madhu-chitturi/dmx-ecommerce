import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("dmx_admin_token");

  const [data, setData] = useState({
    title: "",
    slug: "",
    category: "detergent",
    description: "",
    image: "",
    variants: []
  });

  const uploadImage = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD;
    const up = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
      method: "POST",
      body: form
    });

    const img = await up.json();
    setData(prev => ({ ...prev, image: img.secure_url }));
  };

  const load = async () => {
    const res = await axios.get(`/products/id/${id}`);
    setData(res.data);
  };

  const updateVariant = (i, field, value) => {
    const copy = [...data.variants];
    copy[i][field] = value;
    setData(prev => ({ ...prev, variants: copy }));
  };

  const addVariant = () => {
    setData(prev => ({
      ...prev,
      variants: [...prev.variants, { size: "", mrp: "", offerPrice: "" }]
    }));
  };

  const save = async () => {
    if (!data.title) return alert("Title required");
    if (!data.slug) return alert("Slug required");
    if (data.variants.length === 0) return alert("At least 1 variant required");

    await axios.put(`/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate("/admin/products");
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6 max-w-lg mx-auto space-y-3">
      <h1 className="text-xl font-semibold">Edit Product</h1>

      <input
        value={data.title}
        placeholder="Title"
        onChange={e => setData({ ...data, title: e.target.value })}
        className="border p-2 w-full rounded text-sm"
      />

      <input
        value={data.slug}
        placeholder="Slug"
        onChange={e => setData({ ...data, slug: e.target.value })}
        className="border p-2 w-full rounded text-sm"
      />

      <select
        value={data.category}
        onChange={e => setData({ ...data, category: e.target.value })}
        className="border p-2 w-full rounded text-sm"
      >
        <option value="detergent">Detergent</option>
        <option value="dishwash">Dishwash</option>
        <option value="handwash">Handwash</option>
        <option value="floor">Floor Cleaner</option>
      </select>

      <textarea
        value={data.description}
        placeholder="Description"
        onChange={e => setData({ ...data, description: e.target.value })}
        className="border p-2 w-full rounded text-sm"
      />

      <input
        type="file"
        accept="image/*"
        onChange={e => uploadImage(e.target.files[0])}
        className="border p-2 w-full rounded text-sm"
      />

      {data.image && (
        <img src={data.image} className="w-32 h-32 object-cover rounded" />
      )}

      <h2 className="font-medium mt-4">Variants (min 1)</h2>

      {data.variants.map((v, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={v.size}
            placeholder="Size"
            onChange={e => updateVariant(i, "size", e.target.value)}
            className="border p-2 rounded text-sm flex-1"
          />
          <input
            value={v.mrp}
            placeholder="MRP"
            type="number"
            onChange={e => updateVariant(i, "mrp", e.target.value)}
            className="border p-2 rounded text-sm w-20"
          />
          <input
            value={v.offerPrice}
            placeholder="Offer"
            type="number"
            onChange={e => updateVariant(i, "offerPrice", e.target.value)}
            className="border p-2 rounded text-sm w-20"
          />
        </div>
      ))}

      <button
        onClick={addVariant}
        className="text-xs underline text-gray-700"
      >
        + Add Variant
      </button>

      <button
        onClick={save}
        className="w-full py-2 bg-primary text-white rounded text-sm"
      >
        Save Changes
      </button>
    </div>
  );
}
