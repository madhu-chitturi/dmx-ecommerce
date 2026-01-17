import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [{
    productId: String,
    qty: Number,
    price: Number
  }],
  amount: Number,
  paymentId: String,
  razorpayOrderId: String,
  status: { type: String, default: 'paid' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
