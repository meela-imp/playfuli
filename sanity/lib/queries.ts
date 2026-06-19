import { groq } from 'next-sanity';

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    category,
    emoji,
    coverImage,
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

export const carouselByHandleQuery = groq`
  *[_type == "carousel" && handle.current == $handle][0] {
    _id,
    title,
    items[] {
      name,
      image,
      price,
      link,
      badge
    }
  }
`;
