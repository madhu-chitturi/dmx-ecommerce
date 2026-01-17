import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function NavBar() {
  const { user } = useAuthStore();

  return (
    <nav className="border-b bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="text-xl font-semibold text-primary tracking-wide">
          DMX
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/products" className="hover:text-primary">Products</Link>
          <Link to="/categories" className="hover:text-primary">Categories</Link>

          {user ? (
            <Link to="/profile" className="hover:text-primary">Account</Link>
          ) : (
            <Link to="/login" className="hover:text-primary">Login</Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="hover:text-primary">
            <ShoppingCart size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
