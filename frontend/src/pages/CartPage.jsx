import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { items, total, remove } = useCartStore();

  if (!items.length) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-lg font-semibold">Your cart is empty</h2>
        <a href="/" className="inline-block mt-3 px-5 py-2.5 bg-primary text-white rounded-lg text-sm">
          Shop Now
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-xl font-semibold">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="flex items-center gap-4 bg-white border rounded-xl p-4">
            <img src={item.image} className="w-20 h-20 rounded-lg" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <p className="text-primary font-semibold text-sm">₹{item.price}</p>
            </div>
            <button onClick={() => remove(item._id)} className="text-red-500 text-xs">Remove</button>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-xl p-5 space-y-2">
        <h2 className="font-medium text-gray-800">Order Summary</h2>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <Link
          to="/checkout"
          className="block text-center mt-3 py-2.5 bg-primary text-white rounded-lg text-sm"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
