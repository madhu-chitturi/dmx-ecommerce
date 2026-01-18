import Product from '../models/Product.js';

export const listProducts = async (req, res) => {
  const list = await Product.find().sort({ createdAt: -1 });
  return res.json(list);
};

export const getProduct = async (req, res) => {
  const { slug } = req.params;
  const p = await Product.findOne({ slug });
  if (!p) return res.status(404).json({ error: 'Not found' });
  return res.json(p);
};

// NEW — GET BY ID (for Admin Edit)
export const getProductById = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  return res.json(p);
};

export const createProduct = async (req, res) => {
  const { title, slug, category, description, image, variants } = req.body;

  const product = await Product.create({
    title,
    slug,
    category,
    description,
    image,
    variants,
  });

  res.json(product);
};

export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  return res.json({ success: true });
};
