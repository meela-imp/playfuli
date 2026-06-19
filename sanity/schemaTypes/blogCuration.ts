import { defineType, defineField } from 'sanity';

export const blogCuration = defineType({
  name: 'blogCuration',
  title: 'Blog Curation',
  type: 'document',
  fields: [
    defineField({
      name: 'featured',
      title: 'Hero Carousel',
      description: 'Posts shown in the hero carousel. Drag to reorder. Max 8.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (r) => r.max(8),
    }),
    defineField({
      name: 'trending',
      title: 'Trending Sidebar',
      description: 'Posts shown in the Trending sidebar. Drag to reorder. Max 5.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (r) => r.max(5),
    }),
    defineField({
      name: 'startHere',
      title: '"New to Playfuli?" Section',
      description: 'Posts shown in "New to Playfuli? Start here." Drag to reorder. Max 4.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (r) => r.max(4),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Blog Curation Settings' }),
  },
});
