import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { createOrder } from '../api/payments';

export default function CheckoutPage() {
  const { items, total } = useCartStore();
  const { user } = useAuthStore();

  const payNow = async () => {
    if (!user) {
      return (window.location.href = '/login');
    }

    const { data } = await createOrder({ amount: total });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: 'INR',
      order_id: data.id,
      name: 'DMX Home Clean Products',
      description: 'Order Payment',
      handler: function (response) {
        window.location.href = '/success';
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: '#0D6EFD',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!items.length) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-lg font-semibold">Your cart is empty</h2>
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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>

      {/* Order Review */}
      <div className="bg-white border rounded-xl shadow-sm p-5 space-y-3">
        <h2 className="font-medium text-gray-800">Order Items</h2>
        {items.map((i) => (
          <div key={i._id} className="flex justify-between text-sm">
            <span>{i.title}</span>
            <span>₹{i.price}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-white border rounded-xl shadow-sm p-5">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <span>Total Payable</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={payNow}
        className="w-full py-3 bg-primary text-white rounded-lg text-sm font-medium"
      >
        Pay Now
      </button>
    </div>
  );
}
