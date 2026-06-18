'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AppNav({ email }: { email: string }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <nav className="app-nav">
      <a href="/" className="app-nav-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/playfuli-logo-white.svg" alt="Playfuli" style={{ height: 28, width: 'auto', display: 'block' }} />
      </a>
      <div className="app-nav-right">
        <span className="app-nav-email">{email}</span>
        <button className="app-nav-logout" onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  );
}
