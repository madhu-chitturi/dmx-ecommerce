import express from 'express';
import { adminLogin, initAdmin } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/init', initAdmin); // run only once

export default router;
