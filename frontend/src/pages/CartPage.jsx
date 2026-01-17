import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { items, total, remove, clear } = useCartStore();

  if (!items.length) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-lg font-semibold">Your cart is empty</h2>
        <p className="text-gray-500 text-sm mt-1">
          Add products to your cart and continue shopping.
        </p>
        <a
          href="/"
          className="inline-block mt-3 px-5 py-2.5 bg-primary text-white rounded-lg text-sm"
        >
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
          <div
            key={item._id}
            className="flex items-center gap-4 bg-white shadow-sm border rounded-xl p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <p className="text-primary font-semibold text-sm">₹{item.price}</p>
            </div>

            <button
              onClick={() => remove(item._id)}
              className="text-red-500 text-xs font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-white border rounded-xl shadow-sm p-5">
        <h2 className="font-semibold text-gray-800">Order Summary</h2>
        <div className="text-sm text-gray-600 mt-2 space-y-1">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </p>
          <p className="flex justify-between">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </p>
        </div>

        <div className="flex justify-between font-medium text-gray-900 text-base mt-3 pt-3 border-t">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <Link
          to="/checkout"
          className="block text-center mt-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
