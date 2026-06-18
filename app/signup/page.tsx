'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setSent(true);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/playfuli-logo-blue.svg" alt="Playfuli" className="auth-logo" />
        <h1>Create your account</h1>
        <p className="auth-sub">Set up your parent profile and start building your kid&apos;s play profile.</p>

        {sent ? (
          <div className="auth-success">
            <div className="auth-success-icon">🎉</div>
            <h2>Check your email</h2>
            <p>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          </div>
        ) : (
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
                placeholder="At least 8 characters"
                minLength={8}
                required
                autoComplete="new-password"
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        )}

        <p className="auth-switch">Already have an account? <a href="/login">Log in</a></p>
      </div>
    </div>
  );
}
