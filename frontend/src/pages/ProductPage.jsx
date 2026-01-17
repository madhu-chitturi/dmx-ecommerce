import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../api/products';
import { useCartStore } from '../store/cartStore';
import Header from '../components/Header';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const add = useCartStore((s) => s.add);

  useEffect(() => {
    fetchProduct(slug).then((res) => setProduct(res.data));
  }, [slug]);

  if (!product) return null;

  return (
    <div>
      <Header />
      <div className="p-3 max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mt-4">
        <img src={product.image} className="w-full object-contain h-72" />

        <div>
          <h1 className="font-semibold text-xl">{product.title}</h1>
          <div className="text-primary text-lg font-medium my-2">
            ₹{product.price}
          </div>
          <p className="text-sm opacity-80 mb-3">{product.description}</p>

          <button
            className="bg-primary text-white rounded-md px-4 py-2 text-sm"
            onClick={() => add(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
