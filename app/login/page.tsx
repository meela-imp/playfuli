'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    window.location.href = '/dashboard';
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/playfuli-logo-blue.svg" alt="Playfuli" className="auth-logo" />
        <h1>Welcome back</h1>
        <p className="auth-sub">Log in to manage your kids&apos; profiles.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Your password"
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="auth-switch">Don&apos;t have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}
