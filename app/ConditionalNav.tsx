'use client';

import { usePathname } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

// Routes that provide their own nav/footer or should not show the marketing shell
const EXCLUDED = ['/dashboard', '/studio', '/auth'];

function useExcluded() {
  const pathname = usePathname();
  return EXCLUDED.some(prefix => pathname.startsWith(prefix));
}

export function ConditionalNav() {
  if (useExcluded()) return null;
  return <Nav />;
}

export function ConditionalFooter() {
  if (useExcluded()) return null;
  return <Footer />;
}

// Keep default export for backward compat
export default ConditionalNav;
