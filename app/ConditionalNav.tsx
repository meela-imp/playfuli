'use client';

import { usePathname } from 'next/navigation';
import Nav from '@/components/Nav';

// Routes that provide their own nav or should not show the marketing nav
const EXCLUDED = ['/dashboard', '/studio', '/auth'];

export default function ConditionalNav() {
  const pathname = usePathname();
  if (EXCLUDED.some(prefix => pathname.startsWith(prefix))) return null;
  return <Nav />;
}
