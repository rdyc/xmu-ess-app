import { defineMessages } from 'react-intl';

const prefix = 'lookup.currency';

// page
export const currencyPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
});

// confirmation
export const currencyConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
});

// field
export const currencyField = defineMessages({
  uid: { id: `${prefix}.field.uid` },
  name: { id: `${prefix}.field.name` },
  symbol: { id: `${prefix}.field.symbol` },
  rate: { id: `${prefix}.field.rate` },
  isActive: { id: `${prefix}.field.isActive` },
 
  infoTitle: { id: `${prefix}.field.info.title` },
  infoSubHeader: { id: `${prefix}.field.info.subHeader` },
});