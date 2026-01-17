import express from 'express';
import { listUserOrders, listAllOrders } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

router.get('/me', auth, listUserOrders);
router.get('/admin', auth, admin, listAllOrders);

export default router;
