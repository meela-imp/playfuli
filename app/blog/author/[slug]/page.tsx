import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client } from '../../../../sanity/lib/client';
import Nav from '../../../../components/Nav';
import {
  allAuthorsQuery,
  authorBySlugQuery,
  postsByAuthorQuery,
} from '../../../../sanity/lib/queries';

export const revalidate = 60;

const CAT_STYLES: Record<string, { bg: string; color: string }> = {
  'Gift Guides':    { bg: '#CDE8EF', color: '#1A5060' },
  'Play Ideas':     { bg: '#D2E0CA', color: '#2A4A2A' },
  'Party Planning': { bg: '#F2D888', color: '#6A5210' },
  'Playfuli News':  { bg: '#B0BDDF', color: '#084B6D' },
};

type Author = {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  emoji?: string;
  photoUrl?: string;
  bio?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
};

type Tag = { _id: string; name: string; slug: string };

type Post = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  category?: string;
  emoji?: string;
  tags?: Tag[];
};

export async function generateStaticParams() {
  const authors: { slug: string }[] = await client.fetch(allAuthorsQuery);
  return authors.map(a => ({ slug: a.slug }));
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [author, posts]: [Author | null, Post[]] = await Promise.all([
    client.fetch(authorBySlugQuery, { slug }),
    client.fetch(postsByAuthorQuery, { slug }),
  ]);

  if (!author) notFound();

  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div className="article-breadcrumb">
        <a href="/blog">Blog</a>
        <span className="sep">/</span>
        <span className="bc-current">{author.name}</span>
      </div>

      {/* Author hero */}
      <div className="author-page-hero">
        <div className="author-page-avatar">
          {author.photoUrl ? (
            <img src={author.photoUrl} alt={author.name} />
          ) : (
            <span>{author.emoji ?? '✍️'}</span>
          )}
        </div>
        <div className="author-page-info">
          <h1 className="author-page-name">{author.name}</h1>
          {author.role && <div className="author-page-role">{author.role}</div>}
          {author.bio && <p className="author-page-bio">{author.bio}</p>}
          {author.social && (
            <div className="author-page-social">
              {author.social.twitter && (
                <a
                  href={`https://x.com/${author.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-social-link"
                >
                  𝕏 @{author.social.twitter}
                </a>
              )}
              {author.social.instagram && (
                <a
                  href={`https://instagram.com/${author.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-social-link"
                >
                  ◎ @{author.social.instagram}
                </a>
              )}
              {author.social.website && (
                <a
                  href={author.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="author-social-link"
                >
                  ↗ Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Posts grid */}
      <div className="author-posts-wrap">
        <h2 className="author-posts-heading">
          {posts.length > 0
            ? `${posts.length} article${posts.length === 1 ? '' : 's'} by ${author.name}`
            : `No articles yet`}
        </h2>

        {posts.length > 0 && (
          <div className="author-posts-grid">
            {posts.map(post => {
              const style = CAT_STYLES[post.category ?? ''] ?? { bg: '#CDE8EF', color: '#1A5060' };
              const date = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : null;

              return (
                <a key={post._id} href={`/blog/${post.slug}`} className="author-post-card">
                  <div className="author-post-card-image" style={{ background: style.bg }}>
                    <span>{post.emoji ?? '📝'}</span>
                  </div>
                  <div className="author-post-card-body">
                    <div className="author-post-card-top">
                      {post.category && (
                        <span
                          className="author-post-card-pill"
                          style={{ background: style.bg, color: style.color }}
                        >
                          {post.category}
                        </span>
                      )}
                      {date && <span className="author-post-card-date">{date}</span>}
                    </div>
                    <div className="author-post-card-title">{post.title}</div>
                    {post.excerpt && (
                      <p className="author-post-card-excerpt">{post.excerpt}</p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="author-post-card-tags">
                        {post.tags.slice(0, 3).map(t => (
                          <span key={t._id} className="author-post-card-tag">{t.name}</span>
                        ))}
                      </div>
                    )}
                    <span className="author-post-card-read">Read more →</span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA banner */}
      <div className="article-cta-banner">
        <h2>Skip the guesswork. Keep the magic.</h2>
        <p>Create a play profile for your child in 5 minutes. Share it before the next birthday.</p>
        <a href="/dashboard" className="article-cta-btn">Create a play profile →</a>
      </div>

      {/* Footer */}
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
              <li><a href="/blog?category=Gift+Guides">Gift guides</a></li>
              <li><a href="/blog?category=Play+Ideas">Play ideas</a></li>
              <li><a href="/blog?category=Party+Planning">Birthday planning</a></li>
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
