import { defineMessages } from 'react-intl';

const prefix = 'account.education';

// field
export const accountEducationField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},

  employeeUid: { id: `${prefix}.field.employeeUid`},
  employeeUidPlaceholder: { id: `${prefix}.field.employeeUid.placeholder`},

  degree: { id: `${prefix}.field.degree`},
  degreePlaceholder: { id: `${prefix}.field.degree.placeholder`},
  degreeRequired: { id: `${prefix}.field.degree.placeholder`},

  institution: { id: `${prefix}.field.institution`},
  institutionPlaceholder: { id: `${prefix}.field.institution.placeholder`},
  institutionRequired: { id: `${prefix}.field.institution.placeholder`},

  major: { id: `${prefix}.field.major`},
  majorPlaceholder: { id: `${prefix}.field.major.placeholder`},
  majorRequired: { id: `${prefix}.field.major.placeholder`},

  start: { id: `${prefix}.field.start`},
  startPlaceholder: { id: `${prefix}.field.start.placeholder`},
  startRequired: { id: `${prefix}.field.start.placeholder`},

  end: { id: `${prefix}.field.end`},
  endPlaceholder: { id: `${prefix}.field.end.placeholder`},
});

// helper
export const accountEducationFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return accountEducationField.uid;
      case 'employeeUid': return accountEducationField.employeeUid;
      case 'degreeType': return accountEducationField.degree;
      case 'institution': return accountEducationField.institution;
      case 'major': return accountEducationField.major;
      case 'start': return accountEducationField.start;
      case 'end': return accountEducationField.end;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'degreeType': return accountEducationField.degreeRequired;
      case 'institution': return accountEducationField.institutionRequired;
      case 'major': return accountEducationField.majorRequired;
      case 'start': return accountEducationField.startRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return accountEducationField.uidPlaceholder;
      case 'employeeUid': return accountEducationField.employeeUidPlaceholder;
      case 'degreeType': return accountEducationField.degreePlaceholder;
      case 'institution': return accountEducationField.institutionPlaceholder;
      case 'major': return accountEducationField.majorPlaceholder;
      case 'start': return accountEducationField.startPlaceholder;
      case 'end': return accountEducationField.endPlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};