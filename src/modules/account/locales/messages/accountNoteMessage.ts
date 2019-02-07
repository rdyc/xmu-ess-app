import { defineMessages } from 'react-intl';

const prefix = 'account.note';

// field
export const accountNoteField = defineMessages({
  id: { id: `${prefix}.field.id`},
  idPlaceholder: { id: `${prefix}.field.id.placeholder`},

  employeeUid: { id: `${prefix}.field.employeeUid`},
  employeeUidPlaceholder: { id: `${prefix}.field.employeeUid.placeholder`},

  text: { id: `${prefix}.field.text`},
  textPlaceholder: { id: `${prefix}.field.text.placeholder`},
  textRequired: { id: `${prefix}.field.text.required`},
});

// helper
export const accountNoteFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'id': return accountNoteField.id;
      case 'employeeUid': return accountNoteField.employeeUid;
      case 'text': return accountNoteField.text;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'text': return accountNoteField.textRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'id': return accountNoteField.idPlaceholder;
      case 'employeeUid': return accountNoteField.employeeUidPlaceholder;
      case 'text': return accountNoteField.textPlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};