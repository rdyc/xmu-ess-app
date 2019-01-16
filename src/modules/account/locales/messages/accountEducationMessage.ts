import { defineMessages } from 'react-intl';

const prefix = 'account.education';

// page
export const accountEducationPage = defineMessages({
  newTitle: { id: `${prefix}.page.new.title`},
  newSubHeader: { id: `${prefix}.page.new.subHeader`},
  modifyTitle: { id: `${prefix}.page.modify.title`},
  modifySubHeader: { id: `${prefix}.page.modify.subHeader`},
});

// section
export const accountEducationSection = defineMessages({
  educationTitle: { id: `${prefix}.section.education.title`},
  educationSubHeader: { id: `${prefix}.section.education.subHeader`}
});

// messages
export const accountEducationMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

// confirmation
export const accountEducationConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.subHeader` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.subHeader` },
});

// field
export const accountEducationField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},

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
      case 'degree': return accountEducationField.degree;
      case 'institution': return accountEducationField.institution;
      case 'major': return accountEducationField.major;
      case 'start': return accountEducationField.start;
      case 'end': return accountEducationField.end;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'degree': return accountEducationField.degreeRequired;
      case 'institution': return accountEducationField.institutionRequired;
      case 'major': return accountEducationField.majorRequired;
      case 'start': return accountEducationField.startRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'degree': return accountEducationField.degreePlaceholder;
      case 'institution': return accountEducationField.institutionPlaceholder;
      case 'major': return accountEducationField.majorPlaceholder;
      case 'start': return accountEducationField.startPlaceholder;
      case 'end': return accountEducationField.endPlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};