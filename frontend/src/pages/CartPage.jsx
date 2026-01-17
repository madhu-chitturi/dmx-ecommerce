import { useCartStore } from '../store/cartStore';
import Header from '../components/Header';

export default function CartPage() {
  const { items, remove } = useCartStore();

  const total = items.reduce((t, i) => t + i.price, 0);

  return (
    <div>
      <Header />
      <div className="p-3 max-w-xl mx-auto">
        <h2 className="font-semibold text-lg mb-3">Cart</h2>

        {items.map((p) => (
          <div key={p._id} className="border-b border-border py-3 flex justify-between">
            <div>
              <div className="font-medium text-sm">{p.title}</div>
              <div className="text-primary text-sm">₹{p.price}</div>
            </div>
            <button className="text-red-600 text-xs" onClick={() => remove(p._id)}>
              Remove
            </button>
          </div>
        ))}

        <div className="mt-4 font-semibold">Total: ₹{total}</div>

        <a
          href="/checkout"
          className="block mt-3 bg-primary text-white text-center py-2 rounded-md text-sm"
        >
          Checkout
        </a>
      </div>
    </div>
  );
}
