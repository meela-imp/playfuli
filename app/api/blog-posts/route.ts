import { NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client';
import { groq } from 'next-sanity';

const query = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    emoji,
    featured,
    publishedAt
  }
`;

export async function GET() {
  try {
    const posts = await client.fetch(query);
    return NextResponse.json(posts, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate' },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
