import { client } from '../../../sanity/lib/client';
import { postsForBrowseQuery } from '../../../sanity/lib/queries';
import CategoryUI from './CategoryUI';

export const revalidate = 60;

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat = 'all' } = await searchParams;
  const posts = await client.fetch(postsForBrowseQuery);

  return <CategoryUI posts={posts} activeCat={cat} />;
}
