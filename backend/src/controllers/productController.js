import Product from '../models/Product.js';

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export const listProducts = async (req, res) => {
  const list = await Product.find();
  return res.json(list);
};

export const getProduct = async (req, res) => {
  const { slug } = req.params;
  const p = await Product.findOne({ slug });
  if (!p) return res.status(404).json({ error: 'Not found' });
  return res.json(p);
};

export const createProduct = async (req, res) => {
  const { title, category, description, price, mrp, stock } = req.body;

  const p = await Product.create({
    title,
    slug: slugify(title),
    category,
    description,
    price,
    mrp,
    stock,
    image: req.file?.path // Cloudinary provides URL in path
  });

  return res.json(p);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (body.title) body.slug = slugify(body.title);
  if (req.file) body.image = req.file.path;

  const p = await Product.findByIdAndUpdate(id, body, { new: true });
  return res.json(p);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  return res.json({ success: true });
};
