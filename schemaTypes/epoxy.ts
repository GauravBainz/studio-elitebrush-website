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
      description: 'This will be used as the thumbnail and first carousel image',
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
        }
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Additional Images',
      description: 'Add multiple images for the carousel',
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
      type: 'array',
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