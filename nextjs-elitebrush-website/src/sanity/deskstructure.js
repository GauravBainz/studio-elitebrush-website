import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Replace the default paintings list with an orderable one
      orderableDocumentListDeskItem({
        type: 'painting',
        title: 'Paintings',
        S,
        context: 'paintings'
      }),
      // Add other document types here
      ...S.documentTypeListItems().filter(
        (listItem) => !['painting'].includes(listItem.getId())
      )
    ])