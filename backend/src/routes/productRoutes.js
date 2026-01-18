import express from 'express';
import {
  listProducts,
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

// storefront
router.get('/', listProducts);

// NEW — admin edit by ID
router.get('/id/:id', getProductById);

// storefront slug access
router.get('/:slug', getProduct);

// admin protected
router.post('/', auth, admin, createProduct);
router.put('/:id', auth, admin, updateProduct);
router.delete('/:id', auth, admin, deleteProduct);

export default router;
