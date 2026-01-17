export default function SuccessPage() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-semibold text-primary">Order Successful</h1>
      <p className="text-gray-600 text-sm mt-2">
        Thank you for choosing DMX Home Clean Products!
      </p>

      <a href="/" className="inline-block mt-4 px-6 py-2.5 bg-primary text-white rounded-lg text-sm">
        Continue Shopping
      </a>
    </div>
  );
}
