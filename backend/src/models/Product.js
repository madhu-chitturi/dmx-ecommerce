import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: String,
  description: String,
  price: Number,
  image: String,   // IMPORTANT
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
