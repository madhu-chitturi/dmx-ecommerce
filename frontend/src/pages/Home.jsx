import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { Banner } from '../components/Banner';

export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => setList(res.data));
  }, []);

  return (
    <div>
      <Header />
      <div className="p-3 max-w-5xl mx-auto">
        <Banner />

        <h2 className="text-lg font-semibold mb-3">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {list.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
