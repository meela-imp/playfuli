import { groq } from 'next-sanity';

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, coverImage
  }
`;

const POST_FIELDS = groq`
  _id, title, "slug": slug.current, category, excerpt, emoji, featured, publishedAt
`;

const TAG_FIELDS = groq`"tags": tags[]->{_id, name, "slug": slug.current}`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    category,
    emoji,
    coverImage,
    ${TAG_FIELDS},
    "author": author->{
      name,
      "slug": slug.current,
      emoji,
      "photoUrl": photo.asset->url,
      bio
    },
    body[]{
      ...,
      _type == "carouselBlock" => {
        ...,
        "carousel": carousel->{
          _id,
          title,
          "items": items[]{
            name, price, link, badge,
            "imageUrl": image.asset->url
          }
        }
      }
    }
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && (
    count(tags[]._ref in $tagRefs) > 0 || category == $category
  )] | order(publishedAt desc)[0..8] {
    ${POST_FIELDS},
    ${TAG_FIELDS}
  }
`;

export const relatedByCategoryQuery = groq`
  *[_type == "post" && slug.current != $slug && category == $category && !(_id in $excludeIds)]
    | order(publishedAt desc)[0..3] {
    ${POST_FIELDS}
  }
`;

export const allAuthorsQuery = groq`
  *[_type == "author"] { _id, "slug": slug.current }
`;

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    role,
    emoji,
    "photoUrl": photo.asset->url,
    bio,
    social
  }
`;

export const postsByAuthorQuery = groq`
  *[_type == "post" && author->slug.current == $slug] | order(publishedAt desc) {
    _id, title, "slug": slug.current, publishedAt, excerpt, category, emoji,
    ${TAG_FIELDS}
  }
`;

export const carouselByHandleQuery = groq`
  *[_type == "carousel" && handle.current == $handle][0] {
    _id,
    title,
    items[] {
      name, image, price, link, badge
    }
  }
`;
