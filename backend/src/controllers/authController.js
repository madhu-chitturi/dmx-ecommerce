import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email already exists' });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    isAdmin: false
  });

  const token = signToken({ id: user._id, email, isAdmin: false });

  return res.json({
    token,
    user: { id: user._id, name, email, isAdmin: false }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid email or password' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Invalid email or password' });

  const token = signToken({ id: user._id, email, isAdmin: user.isAdmin });

  return res.json({
    token,
    user: {
      id: user._id,
      email,
      name: user.name,
      isAdmin: user.isAdmin
    }
  });
};
