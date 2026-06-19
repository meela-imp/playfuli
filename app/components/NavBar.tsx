'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-wrap">
      <nav>
        <a className="logo" href="/">
          <Image src="/playfuli-logo-white.svg" alt="Playfuli" width={100} height={28} style={{ display: 'block', height: 28, width: 'auto' }} />
        </a>
        <div className="nav-right">
          <a href="/login" className="nav-link-login">Log in</a>
          <a href="/#how-it-works" className="nav-btn nav-btn-secondary">How it works</a>
          <a href="/dashboard" className="nav-btn nav-btn-primary">Create a profile</a>
        </div>
        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>
      <div className={`nav-mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
        <a href="/login" className="nav-mobile-link">Log in</a>
        <a href="/#how-it-works" className="nav-mobile-link">How it works</a>
        <a href="/dashboard" className="nav-mobile-cta">Create a profile →</a>
      </div>
    </div>
  );
}
