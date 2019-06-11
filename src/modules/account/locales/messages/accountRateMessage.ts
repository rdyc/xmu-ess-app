import { defineMessages } from 'react-intl';

const prefix = 'account.rate';
const fieldPrefix = `${prefix}.field`;

export const accountRateMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

export const accountRateDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modify.title` },
  modifyDescription: { id: `${prefix}.dialog.modify.subHeader` },
});

export const accountRateField = defineMessages({
  rateId: {id: `${fieldPrefix}.uid`},

  value: {id: `${fieldPrefix}.value`},
  valueRequired: {id: `${fieldPrefix}.value.required`},
  valuePlaceholder: {id: `${fieldPrefix}.value.placeholder`},

  isActive: {id: `${fieldPrefix}.isActive`},
  isActiveTrue: {id: `${fieldPrefix}.isActive.true`},
  isActiveFalse: {id: `${fieldPrefix}.isActive.false`},

  created: {id: `${fieldPrefix}.created`}
});

export const accountRateFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'rateId': return accountRateField.rateId;
      case 'value': return accountRateField.value;
      case 'isActive': return accountRateField.isActive;
      case 'created': return accountRateField.created;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'value': return accountRateField.valueRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'value': return accountRateField.valuePlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};