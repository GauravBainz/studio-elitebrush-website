import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const epoxy = defineType({
  name: 'epoxy',
  title: 'Epoxy',
  type: 'document',
  // Add ordering configuration
  orderings: [orderRankOrdering],
  fields: [
    // Add orderRank field for document sorting
    orderRankField({ type: 'epoxy' }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImages',
      title: 'Main Images',
      description: 'Upload multiple images. The first image will be used as the thumbnail.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Enables the hotspot functionality for responsive cropping
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for this image',
            }
          ],
        }
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'beforeAfterImages',
      title: 'Before/After Images',
      description: 'Upload before and after images for comparison',
      type: 'object',
      fields: [
        {
          name: 'before',
          title: 'Before Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        },
        {
          name: 'after',
          title: 'After Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Project Description',
      type: 'array',
      description: 'Add details about the project, techniques used, or client testimonials',
      of: [{type: 'block'}],
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'mainImages.0', // Use the first image as the preview thumbnail
    },
  },
})