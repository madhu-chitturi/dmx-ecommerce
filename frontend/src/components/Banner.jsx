export function Banner() {
  return (
    <div className="rounded-xl p-6 bg-gradient-to-r from-primary to-primaryLight text-white mb-4">
      <h1 className="font-semibold text-xl">Premium Cleaning Essentials</h1>
      <p className="text-sm opacity-90">
        Fresh. Effective. Affordable.
      </p>
      <a
        href="/"
        className="inline-block mt-3 bg-white text-primary px-4 py-1.5 rounded-md text-sm"
      >
        Shop Now
      </a>
    </div>
  );
}
