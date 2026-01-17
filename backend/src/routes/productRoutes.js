import express from 'express';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { upload } from '../utils/upload.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

router.get('/', listProducts);
router.get('/:slug', getProduct);

// admin protected
router.post('/', auth, admin, upload.single('image'), createProduct);
router.put('/:id', auth, admin, upload.single('image'), updateProduct);
router.delete('/:id', auth, admin, deleteProduct);

export default router;
