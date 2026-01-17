import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { createOrder } from '../api/payments';

export default function CheckoutPage() {
  const { items, total } = useCartStore();
  const { user } = useAuthStore();

  const payNow = async () => {
    if (!user) return (window.location.href = '/login');

    const { data } = await createOrder({ amount: total });

    const rzp = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: 'INR',
      order_id: data.id,
      name: 'DMX Home Clean',
      handler: () => window.location.href = '/success'
    });

    rzp.open();
  };

  if (!items.length) return <div className="p-8 text-center">Cart is empty</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Checkout</h1>

      <div className="bg-white border rounded-xl p-5">
        {items.map((i) => (
          <div key={i._id} className="flex justify-between text-sm py-1">
            <span>{i.title}</span>
            <span>₹{i.price}</span>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-xl p-5 flex justify-between font-medium">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button
        onClick={payNow}
        className="w-full py-3 bg-primary text-white rounded-lg text-sm font-medium"
      >
        Pay Now
      </button>
    </div>
  );
}
