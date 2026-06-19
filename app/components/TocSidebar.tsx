'use client';

import { useEffect, useState } from 'react';

export type TocHeading = { level: 'h2' | 'h3'; text: string; id: string };

export default function TocSidebar({
  headings,
  tags,
  postUrl,
}: {
  headings: TocHeading[];
  tags?: string[];
  postUrl: string;
}) {
  const [activeId, setActiveId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-72px 0px -60% 0px', threshold: 0 },
    );
    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  function copyLink() {
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <aside className="article-sidebar">
      {headings.length > 0 && (
        <div className="toc-card">
          <div className="toc-label">Table of Contents</div>
          <ul className="toc-list">
            {headings.map(h => (
              <li key={h.id} style={{ paddingLeft: h.level === 'h3' ? 12 : 0 }}>
                <a
                  href={`#${h.id}`}
                  className={activeId === h.id ? 'toc-active' : ''}
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="tags-card">
          <div className="tags-label">Related Tags</div>
          <div className="tags-list">
            {tags.map(t => (
              <a key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="tag-pill">
                {t}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="cta-card">
        <span className="cta-card-emoji">🎂</span>
        <h3>Know exactly what to get them</h3>
        <p>Create a play profile in 5 minutes. Guests see exactly what your child loves.</p>
        <a href="/dashboard" className="cta-card-btn">Create a play profile</a>
      </div>

      <div className="share-card">
        <div className="share-label">Share this article</div>
        <div className="share-buttons">
          <button className="share-btn" onClick={copyLink}>
            {copied ? '✓ Copied!' : '🔗 Copy link'}
          </button>
          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
          >
            𝕏
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
          >
            Facebook
          </a>
        </div>
      </div>
    </aside>
  );
}
