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
    <div className="p-3 max-w-md mx-auto space-y-3">
      <h1 className="text-xl font-semibold">Login</h1>

      <input
        placeholder="Email"
        className="border p-2 w-full rounded text-sm"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full rounded text-sm"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full py-2 bg-primary text-white rounded text-sm"
        onClick={submit}
      >
        Login
      </button>

      <p className="text-xs text-center">
        New user? <a className="text-primary" href="/register">Create account</a>
      </p>
    </div>
  );
}
