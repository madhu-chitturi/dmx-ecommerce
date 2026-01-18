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
  const { title, slug, category, description, price, image } = req.body;

  const product = await Product.create({
    title,
    slug,
    category,
    description,
    price,
    image,         // THIS FIXES DB
  });

  res.json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
}


export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  return res.json({ success: true });
};

export const getProductById = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
};
