import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: String,
  description: String,
  image: String,

  variants: [
    {
      size: String,
      mrp: Number,         // Maximum Retail Price
      offerPrice: Number,  // Discounted Selling Price
    }
  ],

}, { timestamps: true });

export default mongoose.model('Product', productSchema);
