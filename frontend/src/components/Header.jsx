export default function Header() {
  return (
    <div className="border-b border-border p-3 flex justify-between items-center bg-white">
      <a href="/" className="font-semibold text-primary text-lg">
        DMX
      </a>
      <div className="flex gap-4 text-sm">
        <a href="/cart">Cart</a>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
