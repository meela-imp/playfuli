'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export type BrowsePost = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  emoji?: string;
  publishedAt?: string;
  tagNames?: string[];
};

const CAT_STYLES: Record<string, { bg: string; color: string }> = {
  'Gift Guides':    { bg: '#CDE8EF', color: '#1A5060' },
  'Play Ideas':     { bg: '#D2E0CA', color: '#2A4A2A' },
  'Party Planning': { bg: '#F2D888', color: '#6A5210' },
  'Playfuli News':  { bg: '#B0BDDF', color: '#084B6D' },
};

function score(post: BrowsePost, terms: string[]): number {
  let s = 0;
  const title   = post.title.toLowerCase();
  const excerpt = (post.excerpt ?? '').toLowerCase();
  const cat     = (post.category ?? '').toLowerCase();
  const tags    = (post.tagNames ?? []).join(' ').toLowerCase();
  for (const t of terms) {
    if (title.includes(t))   s += 10;
    if (cat.includes(t))     s += 5;
    if (tags.includes(t))    s += 4;
    if (excerpt.includes(t)) s += 2;
  }
  return s;
}

export default function SearchUI({ posts, initialQuery }: { posts: BrowsePost[]; initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return posts
      .map(p => ({ ...p, _score: score(p, terms) }))
      .filter(p => p._score > 0)
      .sort((a, b) => b._score - a._score);
  }, [posts, query]);

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && query.trim()) {
      router.push('/blog/search?q=' + encodeURIComponent(query.trim()));
    }
  }

  const showEmpty = query.trim().length > 0 && results.length === 0;

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
          <div className="browse-eyebrow"><a href="/blog">← Back to Play Favorites</a></div>
          <h1 className="browse-title">
            {query.trim() ? <>Results for &ldquo;{query}&rdquo;</> : 'Search articles'}
          </h1>
          <p className="browse-count">
            {query.trim()
              ? results.length > 0
                ? <><strong>{results.length}</strong> article{results.length === 1 ? '' : 's'} found</>
                : 'No results found'
              : 'Type a keyword to find articles'}
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
                placeholder="Search articles, topics, or gift ideas…"
                autoComplete="off"
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKey}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="blog-grid-wrap">
        <div className="blog-grid">
          {showEmpty ? (
            <div className="no-results">
              <span className="no-results-emoji">🔍</span>
              <h2>No results for &ldquo;{query}&rdquo;</h2>
              <p>Try a different keyword — like &ldquo;dinosaur&rdquo;, &ldquo;party&rdquo;, or &ldquo;outdoor&rdquo;.</p>
              <a href="/blog">← Browse all articles</a>
            </div>
          ) : (
            results.map(post => {
              const style = CAT_STYLES[post.category ?? ''] ?? { bg: '#CDE8EF', color: '#1A5060' };
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
