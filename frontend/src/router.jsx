import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import AdminEditProduct from './pages/admin/AdminEditProduct';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/product/:slug', element: <ProductPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/checkout', element: <CheckoutPage /> },
  { path: '/success', element: <OrderSuccessPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  // admin
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/admin/products', element: <AdminProducts /> },
  { path: '/admin/products/add', element: <AdminAddProduct /> },
  { path: '/admin/products/edit/:id', element: <AdminEditProduct /> },
]);
