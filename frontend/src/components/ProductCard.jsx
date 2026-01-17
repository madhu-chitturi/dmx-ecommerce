import { useCartStore } from '../store/cartStore';

export default function ProductCard({ product }) {
  const add = useCartStore((s) => s.add);

  return (
    <div className="border border-border rounded-lg p-3 bg-white">
      <a href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-32 w-full object-contain mb-2"
        />
      </a>

      <div className="font-semibold text-sm line-clamp-2">{product.title}</div>
      <div className="text-primary font-medium text-sm">
        ₹{product.price}
      </div>
      <button
        className="mt-2 w-full bg-primary text-white rounded-md h-9 text-sm"
        onClick={() => add(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
