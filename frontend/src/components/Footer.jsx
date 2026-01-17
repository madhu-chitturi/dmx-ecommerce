export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
        
        {/* Brand */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">DMX Home Clean</h3>
          <p>Premium cleaning solutions for modern Indian homes. Affordable, effective, and thoughtfully formulated.</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Explore</h3>
          <ul className="space-y-1">
            <li><a href="/products" className="hover:text-primary">Shop Products</a></li>
            <li><a href="/categories" className="hover:text-primary">Categories</a></li>
            <li><a href="/about" className="hover:text-primary">About Us</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Customer Care</h3>
          <ul className="space-y-1">
            <li><a href="/contact" className="hover:text-primary">Contact</a></li>
            <li><a href="/shipping" className="hover:text-primary">Shipping & Returns</a></li>
            <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t py-3 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DMX Home Clean | Divik Group
      </div>
    </footer>
  );
}
