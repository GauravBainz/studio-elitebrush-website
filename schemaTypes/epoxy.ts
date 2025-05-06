import {defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const epoxy = defineType({
  name: 'epoxy',
  title: 'Epoxy',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'epoxy' }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      description: 'This will be used as the thumbnail and contain the before/after images',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        },
        {
          name: 'tag',
          type: 'string',
          title: 'Image Tag',
          description: 'Tag to display (e.g., BEFORE, AFTER)',
          options: {
            list: [
              {title: 'Before', value: 'BEFORE'},
              {title: 'After', value: 'AFTER'},
              {title: 'None', value: ''}
            ]
          }
        },
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
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Professional Showcase Images',
      description: 'Add high-quality professional images of the finished project',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
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
              description: 'Optional description or detail about this specific view'
            }
          ]
        }
      ],
      options: {
        layout: 'grid',
      },
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
      media: 'mainImage',
    },
  },
})