import Order from '../models/Order.js';

export const listUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  return res.json(orders);
};

export const listAllOrders = async (req, res) => {
  const orders = await Order.find();
  return res.json(orders);
};
