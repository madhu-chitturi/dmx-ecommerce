import { useState } from 'react';
import { register } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useAuthStore((s) => s.setAuth);

  const submit = async () => {
    const res = await register({ name, email, password });
    setAuth(res.data.user, res.data.token);
    window.location.href = '/';
  };

  return (
    <div className="p-3 max-w-md mx-auto space-y-3">
      <h1 className="text-xl font-semibold">Create Account</h1>

      <input
        placeholder="Full Name"
        className="border p-2 w-full rounded text-sm"
        onChange={(e) => setName(e.target.value)}
      />

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
        Create Account
      </button>

      <p className="text-xs text-center">
        Already have an account? <a className="text-primary" href="/login">Login</a>
      </p>
    </div>
  );
}
