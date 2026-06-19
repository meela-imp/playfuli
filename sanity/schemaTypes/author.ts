import { defineType, defineField } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string', description: 'e.g. Gift Guide Editor, Parenting Writer' }),
    defineField({ name: 'emoji', title: 'Avatar emoji', type: 'string', description: 'Fallback avatar if no photo e.g. 🦕' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 5 }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'object',
      fields: [
        defineField({ name: 'twitter', title: 'X / Twitter handle', type: 'string', description: 'Without the @' }),
        defineField({ name: 'instagram', title: 'Instagram handle', type: 'string', description: 'Without the @' }),
        defineField({ name: 'website', title: 'Personal website', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
});
