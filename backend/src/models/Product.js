import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: String,
  description: String,
  price: Number,
  mrp: Number,
  stock: Number,
  image: String,      // Cloudinary URL
});

export default mongoose.model('Product', productSchema);
