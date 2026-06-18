'use client';

import { useRef, useCallback } from 'react';

export default function Nav() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const showPanel = useCallback((panelId: string) => {
    cancelClose();
    const panels = document.querySelectorAll('.nav-panel');
    const items = document.querySelectorAll('.nav-item[data-panel]');
    panels.forEach(p => p.classList.toggle('active', p.id === panelId));
    items.forEach(item => item.classList.toggle('open', (item as HTMLElement).dataset.panel === panelId));
    dropdownRef.current?.classList.add('open');
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      dropdownRef.current?.classList.remove('open');
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('open'));
    }, 160);
  }, [cancelClose]);

  return (
    <nav aria-label="Main navigation">
      <a className="logo" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/playfuli-logo-white.svg" alt="Playfuli" style={{ height: 28, width: 'auto', display: 'block' }} />
      </a>

      <div className="nav-center">
        <div className="nav-item" data-panel="panel-how"
          onMouseEnter={() => showPanel('panel-how')}
          onMouseLeave={scheduleClose}>
          <button className="nav-trigger">How it works <span className="nav-chevron">›</span></button>
        </div>
        <div className="nav-item" data-panel="panel-discover"
          onMouseEnter={() => showPanel('panel-discover')}
          onMouseLeave={scheduleClose}>
          <button className="nav-trigger">Discover <span className="nav-chevron">›</span></button>
        </div>
      </div>

      <div className="nav-dropdown" id="navDropdown" ref={dropdownRef}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}>

        <div className="nav-panel" id="panel-how">
          <div className="mega-feature" style={{ background: '#CDE8EF' }}>
            <div className="mega-feature-eyebrow">Get started</div>
            <div className="mega-feature-icon">🎁</div>
            <div className="mega-feature-title">Create a Play Profile</div>
            <div className="mega-feature-desc">Tell us what your kid loves and share it with your circle so every gift is a hit.</div>
            <a href="/app" className="mega-feature-link">Take our quiz →</a>
          </div>
          <div className="mega-divider"></div>
          <div className="mega-features-section">
            <div className="mega-col-head">Features</div>
            <a href="/app" className="mega-offer">
              <div className="mega-offer-title">For Parents</div>
              <div className="mega-offer-desc">Build a play profile and share a thoughtful, no-pressure way to show guests what your kid loves, has, wants, and what to skip.</div>
            </a>
            <a href="/gift-givers" className="mega-offer">
              <div className="mega-offer-title">For Gift Givers</div>
              <div className="mega-offer-desc">Get to know the birthday kid, browse curated ideas, see what&apos;s already covered, and pick something they&apos;ll actually love.</div>
            </a>
            <a href="/plus" className="mega-offer">
              <div className="mega-offer-title">Playfuli Plus</div>
              <div className="mega-offer-desc">Manage multiple profiles, customize themes, curate gift lists, and unlock advanced thank you and planning features.</div>
            </a>
          </div>
          <div className="mega-divider"></div>
          <div className="mega-right-section">
            <div className="mega-join-col">
              <div className="mega-col-head">Join the Party</div>
              <a href="/about">About</a>
              <a href="/reviews">Reviews</a>
              <a href="/refer">Refer a friend</a>
              <a href="/partners">Partner with us</a>
            </div>
          </div>
        </div>

        <div className="nav-panel" id="panel-discover">
          <div className="mega-feature" style={{ background: '#F2D888' }}>
            <div className="mega-feature-eyebrow">Our blog</div>
            <div className="mega-feature-icon">🎈</div>
            <div className="mega-feature-title">Play Favorites</div>
            <div className="mega-feature-desc">Gift ideas, play inspiration, and party planning — curated for the unique kid in your life.</div>
            <a href="/blog" className="mega-feature-link">Read articles →</a>
          </div>
          <div className="mega-divider"></div>
          <div className="mega-cols" style={{ gap: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
            <div className="mega-features-section" style={{ paddingLeft: 0, borderRight: '1px solid rgba(8,75,109,0.07)', paddingRight: 28, marginRight: 0, flex: 1 }}>
              <div className="mega-col-head">Parents &amp; Kids</div>
              <a href="/blog/gift-guides" className="mega-offer">
                <div className="mega-offer-title">Gift guides</div>
                <div className="mega-offer-desc">Curated picks for every kid, interest, and budget — so you never show up with the wrong thing.</div>
              </a>
              <a href="/blog/play-ideas" className="mega-offer">
                <div className="mega-offer-title">Play ideas</div>
                <div className="mega-offer-desc">Activities, setups, and creative inspiration for the way your kid actually plays.</div>
              </a>
              <a href="/blog/party-planning" className="mega-offer">
                <div className="mega-offer-title">Party planning</div>
                <div className="mega-offer-desc">From themes to timelines, everything you need to throw a party they&apos;ll never forget.</div>
              </a>
            </div>
            <div className="mega-col mega-col-articles" style={{ paddingLeft: 28, paddingRight: 28, paddingTop: 20, paddingBottom: 20, flex: 1 }}>
              <div className="mega-col-head">Recent Articles</div>
              <a href="/blog/dinosaur-gift-guide" className="mega-article">
                <div className="mega-article-thumb" style={{ background: '#CDE8EF' }}>🦕</div>
                <div className="mega-article-title">The Ultimate Dinosaur Gift Guide (Ages 3–6)</div>
              </a>
              <a href="/blog/birthday-party-themes" className="mega-article">
                <div className="mega-article-thumb" style={{ background: '#E8C4C0' }}>🎉</div>
                <div className="mega-article-title">Best Birthday Party Themes of 2026</div>
              </a>
              <a href="/blog/sensory-play" className="mega-article">
                <div className="mega-article-thumb" style={{ background: '#D2E0CA' }}>🌿</div>
                <div className="mega-article-title">5 Sensory Play Ideas for Rainy Afternoons</div>
              </a>
              <a href="/blog" className="mega-view-all">View all articles →</a>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-right">
        <a href="/login" className="nav-link-login">Log in</a>
        <a href="/app" className="nav-btn nav-btn-primary">Create a profile</a>
      </div>
    </nav>
  );
}
