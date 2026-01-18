import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const bestPrice = product.variants?.length
    ? Math.min(...product.variants.map(v => v.offerPrice))
    : null;

  return (
    <div
      onClick={() => navigate(`/product/${product.slug}`)}
      className="border rounded p-3 cursor-pointer hover:shadow-md transition"
    >

      {product.image && (
        <img
          src={product.image}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}

      <div className="font-semibold text-sm">{product.title}</div>

      {bestPrice !== null && (
        <div className="text-primary font-semibold mt-1">
          ₹{bestPrice}
        </div>
      )}
    </div>
  );
}
