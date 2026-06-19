import { client } from '../../../sanity/lib/client';
import { postsForBrowseQuery } from '../../../sanity/lib/queries';
import SearchUI from './SearchUI';

export const revalidate = 60;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const posts = await client.fetch(postsForBrowseQuery);

  return <SearchUI posts={posts} initialQuery={q} />;
}
