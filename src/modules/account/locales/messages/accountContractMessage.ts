import { defineMessages } from 'react-intl';

const prefix = 'account.employee.contract';

// field
export const accountContractField = defineMessages({
  uid: { id: `${prefix}.field.id`},
  uidPlaceholder: { id: `${prefix}.field.id.placeholder`},

  contractNumber: { id: `${prefix}.field.contractNumber`},
  contractNumberPlaceholder: { id: `${prefix}.field.contractNumber.placeholder`},
  contractNumberRequired: { id: `${prefix}.field.contractNumber.required`},

  start: { id: `${prefix}.field.start`},
  startPlaceholder: { id: `${prefix}.field.start.placeholder`},
  startRequired: { id: `${prefix}.field.start.required`},

  end: { id: `${prefix}.field.end`},
  endPlaceholder: { id: `${prefix}.field.end.placeholder`},
  endRequired: { id: `${prefix}.field.end.required`},
});

// helper
export const accountContractFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return accountContractField.uid;
      case 'contractNumber': return accountContractField.contractNumber;
      case 'start': return accountContractField.start;
      case 'end': return accountContractField.end;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'contractNumber': return accountContractField.contractNumberRequired;
      case 'start': return accountContractField.startRequired;
      case 'end': return accountContractField.endRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return accountContractField.uidPlaceholder;
      case 'contractNumber': return accountContractField.contractNumberPlaceholder;
      case 'start': return accountContractField.startPlaceholder;
      case 'end': return accountContractField.endPlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};