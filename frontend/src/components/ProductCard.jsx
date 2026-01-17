export default function ProductCard({ product }) {
  return (
    <a href={`/product/${product.slug}`} className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-3 block">
      <img src={product.image} className="rounded-lg w-full aspect-square object-cover" />
      <h3 className="mt-2 text-sm font-medium text-gray-800">{product.title}</h3>
      <p className="text-primary font-semibold text-sm mt-1">₹{product.price}</p>
    </a>
  );
}
