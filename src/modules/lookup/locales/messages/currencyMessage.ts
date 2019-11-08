import { defineMessages } from 'react-intl';

const prefix = 'lookup.currency';

// message
export const currencyMessage = defineMessages({
  emptyCurrencyUid: { id: `${prefix}.message.empty.currencyUid` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});

// dialog
export const currencyDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle` },
  modifyDescription: { id: `${prefix}.dialog.modifyDescription` },
  createTitle: { id: `${prefix}.dialog.newTitle` },
  createDescription: { id: `${prefix}.dialog.newDescription` },
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
  ActiveStatus: { id: `${prefix}.field.activeStatus` },
  status: { id: `${prefix}.field.status` },
  isActive: { id: `${prefix}.field.isActive` },
  isNotActive: { id: `${prefix}.field.isNotActive` },
 });

export const currencyFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return currencyField.uid;
      case 'name': return currencyField.name;
      case 'symbol': return currencyField.symbol;
      case 'rate': return currencyField.rate;
      case 'isActive': return currencyField.ActiveStatus;
      default: return { id: field };
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return currencyField.nameRequired;
      case 'symbol': return currencyField.symbolRequired;
      case 'rate': return currencyField.rateRequired;

      default: return { id: field };
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'name': return currencyField.namePlaceholder;
      case 'symbol': return currencyField.symbolPlaceholder;
      case 'rate': return currencyField.ratePlaceholder;
      case 'isActive': return currencyField.isActive;

      default: return { id: field };
    }
  }

  return { id: field };
};