import { defineField, defineType } from 'sanity'

export const contact = defineType({
    name: 'contact',
    title: 'Contact',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name:'slug',
            type: 'slug',
            options: {source: 'title'},
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {
            hotspot: true, // Enables the hotspot functionality for better image cropping
            },   
        }),
        defineField({
            name: 'number',
            type: 'string',
            title: 'Phone Number',
        }),
    ],
})
