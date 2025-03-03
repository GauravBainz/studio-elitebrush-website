import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const myStructure = (S) => {
  return S.list()
    .title('Content')
    .items([
      // Orderable epoxy items
      orderableDocumentListDeskItem({
        type: 'epoxy',
        title: 'Epoxy Projects',
        S,
      }),
      
      // Orderable painting items
      orderableDocumentListDeskItem({
        type: 'painting',
        title: 'Painting Projects',
        S,
      }),
      
      // Add any other document types here 
      // that shouldn't be orderable as regular list items
    ])
}