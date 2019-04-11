import { defineMessages } from 'react-intl';

const prefix = 'purchase.item';

export const purchaseItemField = defineMessages({
  uid: { id: `${prefix}.uid`},
  itemsMinimum: { id: `${prefix}.itemsMinimum`},
  description: { id: `${prefix}.description`},
  descriptionPlaceholder: { id: `${prefix}.description.placeholder`},
  request: { id: `${prefix}.request`},
  requestPlaceholder: {id: `${prefix}.request.placeholder`},
  actual: { id: `${prefix}.actual`},
  actualPlaceholder: { id: `${prefix}.actual.placeholder` },
  variance: { id: `${prefix}.variance`}
});