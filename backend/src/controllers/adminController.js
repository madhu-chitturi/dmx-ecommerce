import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/jwt.js';

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, isAdmin: true });
  if (!admin) return res.status(400).json({ error: 'Not an admin' });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ error: 'Wrong password' });

  const token = signToken({ id: admin._id, email: admin.email, isAdmin: true });

  return res.json({
    token,
    admin: { id: admin._id, email: admin.email }
  });
};

export const initAdmin = async (req, res) => {
  const email = process.env.ADMIN_DEFAULT_EMAIL;
  const password = process.env.ADMIN_DEFAULT_PASSWORD;

  const exists = await User.findOne({ email, isAdmin: true });
  if (exists) return res.json({ msg: 'Admin already exists' });

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashed,
    isAdmin: true
  });

  return res.json({ msg: 'Admin initialized' });
};
