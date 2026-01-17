import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="space-y-10">

      {/* HERO */}
      <section className="px-6 pt-8 pb-10 bg-gradient-to-br from-primary/10 to-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
              Premium Home Cleaning Solutions by DMX
            </h1>
            <p className="text-gray-600 max-w-lg">
              Safe, effective, and thoughtfully formulated cleaning products for modern homes.
              Premium quality at an affordable price point.
            </p>
            <div>
              <a
                href="/products"
                className="px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90"
              >
                Shop Now
              </a>
            </div>
          </div>

          <div>
            <img
              src="https://dummyimage.com/600x400/ffffff/0a66c2&text=DMX+Cleaning+Banner"
              className="rounded-xl shadow-md w-full object-cover"
              alt="DMX Hero Banner"
            />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-6 max-w-6xl mx-auto space-y-2">
        <h2 className="text-xl font-semibold">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
