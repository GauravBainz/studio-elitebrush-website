import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

const ORDERABLE_TYPES = ['painting', 'epoxy', 'testimonial']

const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      orderableDocumentListDeskItem({type: 'painting', title: 'Paintings', S, context}),
      orderableDocumentListDeskItem({type: 'epoxy', title: 'Epoxy', S, context}),
      orderableDocumentListDeskItem({type: 'testimonial', title: 'Testimonials', S, context}),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !ORDERABLE_TYPES.includes(item.getId() || '')
      ),
    ])

export default structure
