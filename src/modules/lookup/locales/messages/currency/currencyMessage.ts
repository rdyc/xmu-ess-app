import { defineMessages } from 'react-intl';

const prefix = 'lookup.currency';

// message
export const currencyMessage = defineMessages({
  emptyCurrencyUid: { id: `${prefix}.message.empty.currencyUid` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

// page
export const currencyPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
});

// section
export const currencySection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
});

// form
export const currencyForm = defineMessages({
  newTitle: { id: `${prefix}.form.newTitle` },
  newSubTitle: { id: `${prefix}.form.newSubTitle` },
  editTitle: { id: `${prefix}.form.editTitle` },
  editSubTitle: { id: `${prefix}.form.editSubTitle` },
});

// confirmation
export const currencyConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` },
});

// field
export const currencyField = defineMessages({
  uid: { id: `${prefix}.field.uid` },
  name: { id: `${prefix}.field.name` },
  nameRequired: { id: `${prefix}.field.name.required` },
  namePlaceholder: { id: `${prefix}.field.name.placeholder` },
  symbol: { id: `${prefix}.field.symbol` },
  symbolRequired: { id: `${prefix}.field.symbol.required` },
  symbolPlaceholder: { id: `${prefix}.field.symbol.placeholder` },
  rate: { id: `${prefix}.field.rate` },
  rateRequired: { id: `${prefix}.field.rate.required` },
  ratePlaceholder: { id: `${prefix}.field.rate.placeholder` },
  ActiveStatus: { id: `${prefix}.field.status` },
  isActive: { id: `${prefix}.field.isActive` },
  isNotActive: { id: `${prefix}.field.isNotActive` },
 });