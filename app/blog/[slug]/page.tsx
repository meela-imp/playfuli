import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { client } from '../../../sanity/lib/client';
import { postBySlugQuery, allPostsQuery } from '../../../sanity/lib/queries';
import { urlFor } from '../../../sanity/lib/image';
import CarouselBlock from '../../components/CarouselBlock';

export const revalidate = 60;

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: { asset: { _ref: string } };
  body?: unknown[];
};

export async function generateStaticParams() {
  const posts: Post[] = await client.fetch(allPostsQuery);
  return posts.map((p) => ({ slug: p.slug.current }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: Post | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) notFound();

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px' }}>
      {post.publishedAt && (
        <p style={{ fontFamily: 'var(--font-nunito)', fontSize: 13, color: '#999', marginBottom: 10 }}>
          {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      )}
      <h1 style={{ fontFamily: 'var(--font-fredoka)', fontSize: 40, fontWeight: 600, color: '#084B6D', lineHeight: 1.2, marginBottom: 24 }}>
        {post.title}
      </h1>

      {post.coverImage && (
        <Image
          src={urlFor(post.coverImage).width(720).height(400).fit('crop').url()}
          alt={post.title}
          width={720}
          height={400}
          style={{ borderRadius: 16, objectFit: 'cover', width: '100%', height: 'auto', marginBottom: 40 }}
        />
      )}

      <div className="prose">
        {post.body && (
          <PortableText
            value={post.body as never}
            components={{
              types: {
                carouselBlock: ({ value }) => <CarouselBlock value={value} />,
              },
            }}
          />
        )}
      </div>
    </main>
  );
}
