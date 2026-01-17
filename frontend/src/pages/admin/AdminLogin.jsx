import { useState } from 'react';
import { adminLogin } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAdmin = useAuthStore((s) => s.setAdmin);

  const submit = async () => {
    const res = await adminLogin({ email, password });
    setAdmin(res.data.admin, res.data.token);
    window.location.href = '/admin/products';
  };

  return (
    <div className="p-3 max-w-sm mx-auto">
      <h1 className="font-semibold text-lg mb-3">Admin Login</h1>

      <input
        placeholder="Email"
        className="border p-2 w-full mb-2 text-sm"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-full mb-3 text-sm"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-primary text-white w-full py-2 rounded-md text-sm"
      >
        Login
      </button>
    </div>
  );
}
