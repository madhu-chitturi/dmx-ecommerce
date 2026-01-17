import { useState } from 'react';
import { login } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useAuthStore((s) => s.setAuth);

  const submit = async () => {
    const res = await login({ email, password });
    setAuth(res.data.user, res.data.token);
    window.location.href = '/';
  };

  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="font-semibold text-lg mb-3">Login</h1>

      <input placeholder="Email" className="border p-2 w-full mb-2 text-sm"
        onChange={(e) => setEmail(e.target.value)} />

      <input type="password" placeholder="Password" className="border p-2 w-full mb-3 text-sm"
        onChange={(e) => setPassword(e.target.value)} />

      <button className="bg-primary text-white w-full py-2 rounded-md text-sm"
        onClick={submit}>Login</button>

      <div className="text-xs text-center mt-3">
        No account? <a className="text-primary" href="/register">Register</a>
      </div>
    </div>
  );
}
