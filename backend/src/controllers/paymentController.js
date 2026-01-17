import razorpay from '../config/razorpay.js';
import crypto from 'crypto';
import Order from '../models/Order.js';

export const createRazorpayOrder = async (req, res) => {
  const { amount } = req.body; // paise
  const order = await razorpay.orders.create({
    amount,
    currency: 'INR'
  });

  return res.json(order);
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, userId, amount } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expected !== razorpay_signature) {
    return res.status(400).json({ error: 'Signature mismatch' });
  }

  const order = await Order.create({
    userId,
    items,
    amount,
    paymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    status: 'paid'
  });

  return res.json({ order });
};
