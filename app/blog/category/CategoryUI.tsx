'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { BrowsePost } from '../search/SearchUI';

const CATEGORIES = ['Gift Guides', 'Play Ideas', 'Party Planning', 'Playfuli News'] as const;

const CAT_META: Record<string, { emoji: string; bg: string; color: string }> = {
  'Gift Guides':    { emoji: '🎁', bg: '#CDE8EF', color: '#1A5060' },
  'Play Ideas':     { emoji: '✨', bg: '#D2E0CA', color: '#2A4A2A' },
  'Party Planning': { emoji: '🎂', bg: '#F2D888', color: '#6A5210' },
  'Playfuli News':  { emoji: '📣', bg: '#B0BDDF', color: '#084B6D' },
};

export default function CategoryUI({
  posts,
  activeCat,
}: {
  posts: BrowsePost[];
  activeCat: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const isAll = activeCat === 'all' || activeCat === 'recent' || !activeCat;
  const filtered = isAll ? posts : posts.filter(p => p.category === activeCat);

  const meta = !isAll ? CAT_META[activeCat] : null;
  const pageTitle = meta ? `${meta.emoji} ${activeCat}` : 'All Articles';

  function handleSearchKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && search.trim()) {
      router.push('/blog/search?q=' + encodeURIComponent(search.trim()));
    }
  }

  return (
    <>
      <nav>
        <a className="logo" href="/">
          <Image src="/playfuli-logo-white.svg" alt="Playfuli" width={100} height={28} style={{ display: 'block', height: 28, width: 'auto' }} />
        </a>
        <div className="nav-right">
          <a href="/login" className="nav-link-login">Log in</a>
          <a href="/#how-it-works" className="nav-btn nav-btn-secondary">How it works</a>
          <a href="/dashboard" className="nav-btn nav-btn-primary">Create a profile</a>
        </div>
      </nav>

      <div className="browse-header">
        <div className="browse-header-left">
          <div className="browse-eyebrow"><a href="/blog">← Play Favorites</a></div>
          <h1 className="browse-title">{pageTitle}</h1>
          <p className="browse-count">
            <strong>{filtered.length}</strong> article{filtered.length === 1 ? '' : 's'}
          </p>
        </div>
        <div className="browse-header-right">
          <div className="browse-search-wrap">
            <div className="browse-search-row">
              <span className="browse-search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input
                className="browse-search-input"
                type="text"
                placeholder="Search articles…"
                autoComplete="off"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleSearchKey}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="cat-filters">
        <a
          href="/blog/category?cat=all"
          className={`cat-filter${isAll ? ' active' : ''}`}
          style={isAll ? { background: '#B0BDDF', color: '#084B6D', borderColor: 'transparent' } : {}}
        >
          ✦ All Articles
        </a>
        {CATEGORIES.map(cat => {
          const m = CAT_META[cat];
          const isActive = cat === activeCat;
          return (
            <a
              key={cat}
              href={`/blog/category?cat=${encodeURIComponent(cat)}`}
              className={`cat-filter${isActive ? ' active' : ''}`}
              style={isActive ? { background: m.bg, color: m.color, borderColor: 'transparent' } : {}}
            >
              {m.emoji} {cat}
            </a>
          );
        })}
      </div>

      <div className="blog-grid-wrap">
        <div className="blog-grid">
          {filtered.length === 0 ? (
            <div className="no-results">
              <span className="no-results-emoji">📭</span>
              <h2>Nothing here yet</h2>
              <p>No articles in this category yet — check back soon.</p>
              <a href="/blog/category?cat=all">← Browse all articles</a>
            </div>
          ) : (
            filtered.map(post => {
              const style = CAT_META[post.category ?? ''] ?? { bg: '#CDE8EF', color: '#1A5060' };
              return (
                <a key={post._id} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-image" style={{ background: style.bg }}>
                    {post.emoji ?? '📝'}
                  </div>
                  <div className="blog-card-body">
                    {post.category && (
                      <span className="blog-card-pill" style={{ background: style.bg, color: style.color }}>
                        {post.category}
                      </span>
                    )}
                    <div className="blog-card-title">{post.title}</div>
                    {post.excerpt && <div className="blog-card-excerpt">{post.excerpt}</div>}
                    <span className="blog-card-read">Read more →</span>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>

      <div className="article-cta-banner">
        <h2>Skip the guesswork. Keep the magic.</h2>
        <p>Create a play profile for your child in 5 minutes. Share it before the next birthday.</p>
        <a href="/dashboard" className="article-cta-btn">Create a play profile →</a>
      </div>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col-brand">
            <div className="footer-logo">
              <Image src="/playfuli-logo-white.svg" alt="Playfuli" width={100} height={28} style={{ display: 'block', height: 28, width: 'auto' }} />
            </div>
            <p className="footer-tagline">Where great gifts come from.</p>
            <div className="footer-legal">
              <a href="/terms">Terms of Service</a> · <a href="/privacy">Privacy Policy</a><br />
              © 2026 Playfuli. All rights reserved.
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="/#how-it-works">How it works</a></li>
              <li><a href="/dashboard">Create a profile</a></li>
              <li><a href="/about">About us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Blog</h4>
            <ul>
              <li><a href="/blog/category?cat=Gift+Guides">Gift guides</a></li>
              <li><a href="/blog/category?cat=Play+Ideas">Play ideas</a></li>
              <li><a href="/blog/category?cat=Party+Planning">Birthday planning</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="/login">Log in</a></li>
              <li><a href="/contact">Contact us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Playfuli. All rights reserved.</div>
      </footer>
    </>
  );
}
