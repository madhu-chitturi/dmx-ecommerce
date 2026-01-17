import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { createOrder, verifyPayment } from '../api/payment';

export default function CheckoutPage() {
  const { token, user } = useAuthStore();
  const { items, clear } = useCartStore();

  const total = items.reduce((t, i) => t + i.price, 0);
  const amountPaise = total * 100;

  const pay = async () => {
    const order = await createOrder({ amount: amountPaise }, token);

    const rzp = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.data.amount,
      currency: 'INR',
      order_id: order.data.id,
      handler: async (res) => {
        await verifyPayment({
          razorpay_order_id: res.razorpay_order_id,
          razorpay_payment_id: res.razorpay_payment_id,
          razorpay_signature: res.razorpay_signature,
          items,
          amount: total,
          userId: user.id
        }, token);

        clear();
        window.location.href = '/success';
      }
    });

    rzp.open();
  };

  return (
    <div className="p-3 max-w-md mx-auto">
      <h2 className="font-semibold text-lg mb-3">Checkout</h2>
      <div>Total: ₹{total}</div>
      <button className="bg-primary text-white rounded-md px-4 py-2 mt-3" onClick={pay}>
        Pay Now
      </button>
    </div>
  );
}
