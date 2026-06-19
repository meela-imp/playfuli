import { NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client';
import { groq } from 'next-sanity';

const POST_FIELDS = groq`
  _id, title, "slug": slug.current, category, excerpt, emoji, featured, publishedAt
`;

const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }
`;

const curationQuery = groq`
  *[_type == "blogCuration"][0] {
    "featured":   featured[]->{ ${POST_FIELDS} },
    "trending":   trending[]->{ ${POST_FIELDS} },
    "startHere":  startHere[]->{ ${POST_FIELDS} }
  }
`;

export async function GET() {
  try {
    const [posts, curation] = await Promise.all([
      client.fetch(postsQuery),
      client.fetch(curationQuery),
    ]);
    return NextResponse.json(
      { posts, curation: curation ?? {} },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate' } },
    );
  } catch {
    return NextResponse.json({ posts: [], curation: {} }, { status: 200 });
  }
}
