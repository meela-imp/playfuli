import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { client } from '../../../sanity/lib/client';
import {
  postBySlugQuery,
  allPostsQuery,
  relatedPostsQuery,
  relatedByCategoryQuery,
} from '../../../sanity/lib/queries';
import { urlFor } from '../../../sanity/lib/image';
import CarouselBlock from '../../components/CarouselBlock';
import TocSidebar, { type TocHeading } from '../../components/TocSidebar';
import { slugify } from '../../lib/slugify';

export const revalidate = 60;

const CAT_STYLES: Record<string, { bg: string; color: string }> = {
  'Gift Guides':    { bg: '#CDE8EF', color: '#1A5060' },
  'Play Ideas':     { bg: '#D2E0CA', color: '#2A4A2A' },
  'Party Planning': { bg: '#F2D888', color: '#6A5210' },
  'Playfuli News':  { bg: '#B0BDDF', color: '#084B6D' },
};

type BodyBlock = {
  _type: string;
  style?: string;
  children?: { _type: string; text: string }[];
  [key: string]: unknown;
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
  coverImage?: { asset: { _ref: string } };
  author?: { name: string; slug?: string; emoji?: string; photoUrl?: string; bio?: string };
  body?: BodyBlock[];
};

type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  emoji?: string;
  excerpt?: string;
  tags?: Tag[];
};

function extractHeadings(body?: BodyBlock[]): TocHeading[] {
  if (!body) return [];
  return body
    .filter(b => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map(b => {
      const text = (b.children ?? []).map(c => c.text).join('');
      return { level: b.style as 'h2' | 'h3', text, id: slugify(text) };
    });
}

function sortByTagOverlap(candidates: RelatedPost[], tagIds: string[]): RelatedPost[] {
  return [...candidates].sort((a, b) => {
    const aOverlap = (a.tags ?? []).filter(t => tagIds.includes(t._id)).length;
    const bOverlap = (b.tags ?? []).filter(t => tagIds.includes(t._id)).length;
    return bOverlap - aOverlap;
  });
}

export async function generateStaticParams() {
  const posts: { slug: { current: string } }[] = await client.fetch(allPostsQuery);
  return posts.map(p => ({ slug: p.slug.current }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });
  if (!post) notFound();

  const headings = extractHeadings(post.body);

  // Related: tag overlap first, pad with same-category
  const tagRefs = (post.tags ?? []).map(t => t._id);
  let related: RelatedPost[] = [];
  if (tagRefs.length) {
    const candidates: RelatedPost[] = await client.fetch(relatedPostsQuery, {
      slug,
      tagRefs,
      category: post.category ?? '',
    });
    related = sortByTagOverlap(candidates, tagRefs).slice(0, 3);
  }
  if (related.length < 3 && post.category) {
    const fallback: RelatedPost[] = await client.fetch(relatedByCategoryQuery, {
      slug,
      category: post.category,
      excludeIds: related.map(r => r._id),
    });
    related = [...related, ...fallback].slice(0, 3);
  }

  const postUrl = `https://playfuli.co/blog/${slug}`;
  const catStyle = CAT_STYLES[post.category ?? ''] ?? { bg: '#CDE8EF', color: '#1A5060' };
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <>
      {/* Nav */}
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

      {/* Breadcrumb */}
      <div className="article-breadcrumb">
        <a href="/blog">Blog</a>
        {post.category && (
          <>
            <span className="sep">/</span>
            <a href={`/blog?category=${encodeURIComponent(post.category)}`}>{post.category}</a>
          </>
        )}
        <span className="sep">/</span>
        <span className="bc-current">{post.title}</span>
      </div>

      {/* Article header */}
      <div className="article-header">
        <div>
          {post.category && (
            <a
              className="article-category"
              href={`/blog?category=${encodeURIComponent(post.category)}`}
            >
              {post.category}
            </a>
          )}
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            {post.author && (
              <>
                <div className="article-meta-avatar">
                  {post.author.photoUrl ? (
                    <img src={post.author.photoUrl} alt={post.author.name} />
                  ) : (
                    <span>{post.author.emoji ?? '✍️'}</span>
                  )}
                </div>
                <div className="article-meta-info">
                  <span className="article-meta-name">{post.author.name}</span>
                  {formattedDate && <span className="article-meta-date">{formattedDate}</span>}
                </div>
              </>
            )}
            {!post.author && formattedDate && (
              <span className="article-meta-date">{formattedDate}</span>
            )}
          </div>
        </div>

        <div
          className="article-hero"
          style={{ background: catStyle.bg }}
        >
          {post.coverImage ? (
            <Image
              src={urlFor(post.coverImage).width(400).height(280).fit('crop').url()}
              alt={post.title}
              width={400}
              height={280}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: 90 }}>{post.emoji ?? '📝'}</span>
          )}
        </div>
      </div>

      <div className="article-divider"><hr /></div>

      {/* Body + sidebar */}
      <div className="article-wrap">
        <article className="article-body">
          {post.body && (
            <PortableText
              value={post.body as never}
              components={{
                block: {
                  h2: ({ children, value }) => (
                    <h2 id={slugify((value as BodyBlock).children?.map(c => c.text).join('') ?? '')}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children, value }) => (
                    <h3 id={slugify((value as BodyBlock).children?.map(c => c.text).join('') ?? '')}>
                      {children}
                    </h3>
                  ),
                },
                types: {
                  callout: ({ value }: { value: { emoji?: string; text?: string } }) => (
                    <div className="article-callout">
                      <span className="callout-emoji">{value.emoji ?? '💡'}</span>
                      <span>{value.text}</span>
                    </div>
                  ),
                  carouselBlock: ({ value }) => <CarouselBlock value={value} />,
                  image: ({ value }: { value: { asset?: { _ref: string }; alt?: string; caption?: string } }) => {
                    if (!value.asset) return null;
                    return (
                      <figure style={{ margin: '28px 0' }}>
                        <Image
                          src={urlFor(value).width(720).url()}
                          alt={value.alt ?? ''}
                          width={720}
                          height={400}
                          style={{ borderRadius: 12, width: '100%', height: 'auto' }}
                        />
                        {value.caption && (
                          <figcaption style={{ fontSize: 12, color: '#999', marginTop: 8, textAlign: 'center' }}>
                            {value.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  },
                },
              }}
            />
          )}
        </article>

        <TocSidebar headings={headings} tags={(post.tags ?? []).map(t => t.name)} postUrl={postUrl} />
      </div>

      {/* Author bio */}
      {post.author && (
        <div className="author-bio-wrap">
          <div className="author-bio">
            <div className="author-bio-avatar">
              {post.author.photoUrl ? (
                <img src={post.author.photoUrl} alt={post.author.name} />
              ) : (
                <span>{post.author.emoji ?? '✍️'}</span>
              )}
            </div>
            <div>
              <div className="author-bio-name">{post.author.name}</div>
              {post.author.bio && <p className="author-bio-text">{post.author.bio}</p>}
              {post.author.slug && (
                <a href={`/blog/author/${post.author.slug}`} className="author-bio-link">
                  See more from {post.author.name} →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Related articles */}
      {related.length > 0 && (
        <div className="related-wrap">
          <h2 className="related-title">You might also like</h2>
          <div className="related-grid">
            {related.map(r => {
              const rStyle = CAT_STYLES[r.category ?? ''] ?? { bg: '#CDE8EF', color: '#1A5060' };
              return (
                <a key={r._id} href={`/blog/${r.slug}`} className="related-card">
                  <div className="related-card-image" style={{ background: rStyle.bg }}>
                    <span>{r.emoji ?? '📝'}</span>
                  </div>
                  <div className="related-card-body">
                    {r.category && (
                      <span
                        className="related-card-pill"
                        style={{ background: rStyle.bg, color: rStyle.color }}
                      >
                        {r.category}
                      </span>
                    )}
                    <div className="related-card-title">{r.title}</div>
                    {r.excerpt && <p className="related-card-excerpt">{r.excerpt}</p>}
                    <span className="related-card-read">Read more →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

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
