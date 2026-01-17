import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/products';
import { useCartStore } from '../store/cartStore';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const add = useCartStore((s) => s.add);

  useEffect(() => {
    getProduct(slug).then((res) => setProduct(res.data));
  }, [slug]);

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          className="w-full rounded-xl shadow-md object-cover"
          alt={product.title}
        />

        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-gray-900">{product.title}</h1>
          <p className="text-primary font-semibold text-xl">₹{product.price}</p>
          <p className="text-gray-600 text-sm">{product.description}</p>

          <button
            onClick={() => add(product)}
            className="mt-3 px-5 py-2.5 text-sm bg-primary text-white rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Product Benefits</h2>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Deep cleaning and deodorizing</li>
          <li>Everyday home-safe formulation</li>
          <li>Premium concentrated solution</li>
        </ul>
      </section>
    </div>
  );
}
