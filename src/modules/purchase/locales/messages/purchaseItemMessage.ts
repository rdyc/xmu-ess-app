import { defineMessages } from 'react-intl';

const prefix = 'purchase.item';

export const purchaseItemField = defineMessages({
  uid: { id: `${prefix}.uid`},
  description: { id: `${prefix}.description`},
  request: { id: `${prefix}.request`},
  requestPlaceholder: {id: `${prefix}.request.placeholder`},
  actual: { id: `${prefix}.actual`},
  actualPlaceholder: { id: `${prefix}.actual.placeholder` },
  variance: { id: `${prefix}.variance`}
});