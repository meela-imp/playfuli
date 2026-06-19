import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'playfuli',
  title: 'Playfuli',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('post').title('Blog Posts'),
            S.documentTypeListItem('author').title('Authors'),
            S.divider(),
            S.documentTypeListItem('carousel').title('Carousels'),
            S.documentTypeListItem('blogCuration').title('Blog Curation'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  basePath: '/studio',
});
