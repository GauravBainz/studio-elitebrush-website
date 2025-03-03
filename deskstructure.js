import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Orderable paintings list
      orderableDocumentListDeskItem({
        type: 'painting',
        title: 'Paintings',
        S,
        context: 'paintings'
      }),
      // Add orderable epoxy list
      orderableDocumentListDeskItem({
        type: 'epoxy',
        title: 'Epoxy',
        S,
        context: 'epoxy'
      }),
      // Add other document types here
      ...S.documentTypeListItems().filter(
        (listItem) => !['painting', 'epoxy'].includes(listItem.getId())
      )
    ])