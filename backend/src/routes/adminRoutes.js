import express from 'express';
import { adminLogin, initAdmin } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();
router.get('/init', async (req, res) => {
  const exists = await User.findOne({ email: 'admin@dmx.com' });
  if (exists) return res.json({ msg: 'Admin already exists' });

  const password = await bcrypt.hash('Admin123', 10);
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@dmx.com',
    password,
    role: 'admin'
  });

  res.json({ msg: 'Admin created', admin });
});


router.post('/login', adminLogin);
router.get('/init', initAdmin); // run only once

export default router;
