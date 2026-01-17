export default function CategoriesPage() {
  const categories = [
    { name: 'Detergent', link: '/products?cat=detergent' },
    { name: 'Dishwash', link: '/products?cat=dishwash' },
    { name: 'Handwash', link: '/products?cat=handwash' },
    { name: 'Floor Cleaner', link: '/products?cat=floor' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Categories</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((c) => (
          <a
            key={c.name}
            href={c.link}
            className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md text-center"
          >
            {c.name}
          </a>
        ))}
      </div>
    </div>
  );
}
