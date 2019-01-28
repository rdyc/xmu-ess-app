import { defineMessages } from 'react-intl';

const prefix = 'account.family';

// field
export const accountFamilyField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},

  employeeUid: { id: `${prefix}.field.employeeUid`},
  employeeUidPlaceholder: { id: `${prefix}.field.employeeUid.placeholder`},

  familyType: { id: `${prefix}.field.familyType`},
  familyTypePlaceholder: { id: `${prefix}.field.familyType.placeholder`},
  familyTypeRequired: { id: `${prefix}.field.familyType.required`},

  fullName: { id: `${prefix}.field.fullName`},
  fullNamePlaceholder: { id: `${prefix}.field.fullName.placeholder`},
  fullNameRequired: { id: `${prefix}.field.fullName.required`},

  genderType: { id: `${prefix}.field.genderType`},
  genderTypePlaceholder: { id: `${prefix}.field.genderType.placeholder`},
  genderTypeRequired: { id: `${prefix}.field.genderType.required`},

  birthPlace: { id: `${prefix}.field.birthPlace`},
  birthPlacePlaceholder: { id: `${prefix}.field.birthPlace.placeholder`},
  birthPlaceRequired: { id: `${prefix}.field.birthPlace.required`},

  birthDate: { id: `${prefix}.field.birthDate`},
  birthDatePlaceholder: { id: `${prefix}.field.birthDate.placeholder`},
});

// helper
export const accountFamilyFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return accountFamilyField.uid;
      case 'employeeUid': return accountFamilyField.employeeUid;
      case 'familyType': return accountFamilyField.familyType;
      case 'fullName': return accountFamilyField.fullName;
      case 'genderType': return accountFamilyField.genderType;
      case 'birthPlace': return accountFamilyField.birthPlace;
      case 'birthDate': return accountFamilyField.birthDate;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'fullName': return accountFamilyField.fullNameRequired;
      case 'familyType': return accountFamilyField.familyTypeRequired;
      case 'genderType': return accountFamilyField.genderTypeRequired;
      case 'birthPlace': return accountFamilyField.birthPlaceRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return accountFamilyField.uidPlaceholder;
      case 'employeeUid': return accountFamilyField.employeeUidPlaceholder;
      case 'familyType': return accountFamilyField.familyTypePlaceholder;
      case 'fullName': return accountFamilyField.fullNamePlaceholder;
      case 'genderType': return accountFamilyField.genderTypePlaceholder;
      case 'birthPlace': return accountFamilyField.birthPlacePlaceholder;
      case 'birthDate': return accountFamilyField.birthDatePlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};