import { useState } from "react";
import axios from "../../api/axios";

export default function AdminNewProduct() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("detergent");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [variants, setVariants] = useState([
    { size: "", mrp: "", offerPrice: "" }
  ]);

  const token = localStorage.getItem("dmx_admin_token");

  const addVariant = () => {
    setVariants([...variants, { size: "", mrp: "", offerPrice: "" }]);
  };

  const updateVariant = (index, field, value) => {
    const copy = [...variants];
    copy[index][field] = value;
    setVariants(copy);
  };

  const uploadImage = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD;
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
      { method: "POST", body: form }
    );

    const data = await res.json();
    setImage(data.secure_url);
  };

  const submit = async () => {
    if (!title) return alert("Title required");
    if (!slug) return alert("Slug required");
    if (variants.length === 0) return alert("At least one variant required");

    await axios.post(
      "/products",
      {
        title,
        slug,
        category,
        description,
        image,
        variants: variants.map(v => ({
          size: v.size,
          mrp: Number(v.mrp),
          offerPrice: Number(v.offerPrice),
        }))
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    window.location.href = "/admin/products";
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-3">
      <h1 className="text-xl font-semibold">New Product</h1>

      <input
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      />

      <input
        placeholder="Slug"
        onChange={e => setSlug(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      />

      <select
        onChange={e => setCategory(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      >
        <option value="detergent">Detergent</option>
        <option value="dishwash">Dishwash</option>
        <option value="handwash">Handwash</option>
        <option value="floor">Floor Cleaner</option>
      </select>

      <textarea
        placeholder="Description"
        onChange={e => setDescription(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      />

      <input
        type="file"
        accept="image/*"
        onChange={e => uploadImage(e.target.files[0])}
        className="border p-2 w-full rounded text-sm"
      />

      {image && <img src={image} className="w-32 h-32 object-cover rounded" />}

      <h2 className="font-medium mt-4">Variants (min 1)</h2>

      {variants.map((v, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            placeholder="Size (e.g. 1L)"
            value={v.size}
            onChange={e => updateVariant(i, "size", e.target.value)}
            className="border p-2 rounded text-sm flex-1"
          />
          <input
            placeholder="MRP"
            type="number"
            value={v.mrp}
            onChange={e => updateVariant(i, "mrp", e.target.value)}
            className="border p-2 rounded text-sm w-24"
          />
          <input
            placeholder="Offer"
            type="number"
            value={v.offerPrice}
            onChange={e => updateVariant(i, "offerPrice", e.target.value)}
            className="border p-2 rounded text-sm w-24"
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
        onClick={submit}
        className="w-full py-2 bg-primary text-white rounded text-sm"
      >
        Save Product
      </button>
    </div>
  );
}
