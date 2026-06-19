import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../sanity/lib/client';
import { allPostsQuery } from '../../sanity/lib/queries';
import { urlFor } from '../../sanity/lib/image';

export const revalidate = 60;

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: { asset: { _ref: string } };
};

export default async function BlogPage() {
  const posts: Post[] = await client.fetch(allPostsQuery);

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>
      <h1 style={{ fontFamily: 'var(--font-fredoka)', fontSize: 40, fontWeight: 600, color: '#084B6D', marginBottom: 8 }}>
        The Playfuli Blog
      </h1>
      <p style={{ fontFamily: 'var(--font-nunito)', color: '#555', marginBottom: 48 }}>
        Gift ideas, play trends, and what kids actually want.
      </p>

      {posts.length === 0 && (
        <p style={{ fontFamily: 'var(--font-nunito)', color: '#999' }}>No posts yet — check back soon.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none' }}>
            <article style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              {post.coverImage && (
                <Image
                  src={urlFor(post.coverImage).width(240).height(160).fit('crop').url()}
                  alt={post.title}
                  width={240}
                  height={160}
                  style={{ borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
                />
              )}
              <div>
                {post.publishedAt && (
                  <p style={{ fontFamily: 'var(--font-nunito)', fontSize: 13, color: '#999', marginBottom: 6 }}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                )}
                <h2 style={{ fontFamily: 'var(--font-fredoka)', fontSize: 24, fontWeight: 600, color: '#084B6D', marginBottom: 8 }}>
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p style={{ fontFamily: 'var(--font-nunito)', color: '#555', lineHeight: 1.6 }}>{post.excerpt}</p>
                )}
                <p style={{ fontFamily: 'var(--font-nunito)', fontWeight: 700, color: '#B0BDDF', marginTop: 12, fontSize: 14 }}>
                  Read more →
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
