import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Gift Guides', value: 'Gift Guides' },
          { title: 'Play Ideas', value: 'Play Ideas' },
          { title: 'Party Planning', value: 'Party Planning' },
          { title: 'Playfuli News', value: 'Playfuli News' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured (show in hero carousel)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'emoji',
      title: 'Card emoji',
      type: 'string',
      description: 'Single emoji shown in the card thumbnail e.g. 🦕',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Pick from existing tags — used for "You might also like" recommendations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout / Tip box',
          fields: [
            defineField({ name: 'emoji', title: 'Emoji', type: 'string', description: 'e.g. 💡 or 🎁', initialValue: '💡' }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 2, validation: (r) => r.required() }),
          ],
          preview: {
            select: { title: 'text', subtitle: 'emoji' },
            prepare: ({ title, subtitle }: Record<string, string>) => ({
              title: `${subtitle || '💡'} ${title || 'Callout'}`,
            }),
          },
        },
        {
          type: 'object',
          name: 'carouselBlock',
          title: 'Product Carousel',
          fields: [
            defineField({
              name: 'carousel',
              title: 'Carousel',
              type: 'reference',
              to: [{ type: 'carousel' }],
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'carousel.title' },
            prepare: (value: Record<string, string>) => ({
              title: value.title || 'Unnamed Carousel',
              subtitle: 'Product Carousel 🛍️',
            }),
          },
        },
      ],
    }),
  ],
  orderings: [{ title: 'Published date, newest', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
});
