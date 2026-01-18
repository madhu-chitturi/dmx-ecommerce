import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [active, setActive] = useState(0);

  const load = async () => {
    const res = await axios.get(`/products/${slug}`);
    setProduct(res.data);
  };

  useEffect(() => { load(); }, [slug]);

  if (!product) return <div className="p-6">Loading...</div>;

  const selected = product.variants[active];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">

      {product.image && (
        <img
          src={product.image}
          className="w-full h-72 object-cover rounded"
        />
      )}

      <div className="space-y-1">
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <div className="text-sm text-gray-500">{product.category}</div>
      </div>

      {/* variant tiles */}
      <div className="flex gap-2">
        {product.variants.map((v, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-3 py-1 rounded border text-sm ${
              i === active ? "border-primary text-primary" : "border-gray-300"
            }`}
          >
            {v.size}
          </button>
        ))}
      </div>

      {/* price area */}
      <div className="space-y-1">
        <div className="flex gap-2 items-center">
          <span className="line-through text-gray-500 text-sm">
            ₹{selected.mrp}
          </span>
          <span className="text-primary font-semibold text-lg">
            ₹{selected.offerPrice}
          </span>
        </div>
      </div>

      {product.description && (
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {product.description}
        </p>
      )}

      {/* Add-to-cart skipped due to A */}
    </div>
  );
}
