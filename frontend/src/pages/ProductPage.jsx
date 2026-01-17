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

      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* IMAGE */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-xl shadow-md object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            {product.title}
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-primary font-semibold text-xl">
              ₹{product.price}
            </span>
            {product.mrp && (
              <span className="line-through text-gray-400 text-sm">₹{product.mrp}</span>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Add to cart */}
          <button
            onClick={() => add(product)}
            className="mt-3 px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* BENEFITS SECTION */}
      <section className="space-y-2">
        <h2 className="text-lg font-medium text-gray-800">Product Benefits</h2>
        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
          <li>Deep cleaning and deodorizing formula</li>
          <li>Safe for everyday household use</li>
          <li>Premium quality concentrated solution</li>
          <li>Effective against stains and germs</li>
        </ul>
      </section>
    </div>
  );
}
