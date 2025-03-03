import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { structure } from './deskstructure'

export default defineConfig({
  name: 'default',
  title: 'EliteBrush-Website',

  projectId: '6jt2s6p5',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), structure],

  schema: {
    types: schemaTypes,
  },
})
