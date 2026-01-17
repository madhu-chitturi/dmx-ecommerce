import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

// CREATE APP FIRST
const app = express();

// PARSE JSON FIRST
app.use(express.json());

// CORS MUST COME AFTER APP BUT BEFORE ROUTES
app.use(cors({
  origin: [
    "https://dmx-ecommerce.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options('*', cors());

// CONNECT DB AFTER ENV READY
connectDB();

// ROUTES AFTER CORS
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend running on port ${port}`));
