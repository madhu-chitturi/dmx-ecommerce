import { useState } from 'react';
import axios from '../../api/axios';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAdmin = async () => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('dmx_admin_token', res.data.token);
      window.location.href = '/admin/products';
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-3">
      <h1 className="text-xl font-semibold">Admin Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full rounded text-sm"
      />

      <button
        onClick={loginAdmin}
        className="w-full py-2 bg-primary text-white rounded text-sm"
      >
        Login as Admin
      </button>
    </div>
  );
}
