import { defineType, defineField } from 'sanity';

export const carousel = defineType({
  name: 'carousel',
  title: 'Merch Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'handle',
      title: 'Handle',
      description: 'Unique identifier used to embed this carousel (e.g. "homepage-featured")',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'item',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'price', title: 'Price', type: 'number' }),
            defineField({ name: 'link', title: 'Link URL', type: 'url' }),
            defineField({ name: 'badge', title: 'Badge (optional)', type: 'string', description: 'e.g. "New", "Top pick"' }),
          ],
          preview: { select: { title: 'name', subtitle: 'price', media: 'image' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'handle.current' },
  },
});
