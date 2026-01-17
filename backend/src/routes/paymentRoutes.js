import express from 'express';
import { createRazorpayOrder, verifyPayment } from '../controllers/paymentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createRazorpayOrder);
router.post('/verify', auth, verifyPayment);

export default router;
