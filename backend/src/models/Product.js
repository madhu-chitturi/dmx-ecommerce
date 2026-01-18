import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },        // e.g. "500ml", "1L"
  mrp: { type: Number, required: true },         // e.g. 120
  offerPrice: { type: Number, required: true },  // e.g. 99
}, { _id: false });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },                       // Cloudinary URL
  variants: [variantSchema],                     // FMCG variant pricing
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
