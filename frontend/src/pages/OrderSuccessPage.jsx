export default function OrderSuccessPage() {
  return (
    <div className="p-3 text-center">
      <h1 className="text-xl font-semibold text-green-600">Order Successful</h1>
      <p className="text-sm opacity-80 mt-2">Thank you for shopping with DMX.</p>
      <a href="/" className="inline-block mt-4 text-primary underline text-sm">
        Continue Shopping
      </a>
    </div>
  );
}
