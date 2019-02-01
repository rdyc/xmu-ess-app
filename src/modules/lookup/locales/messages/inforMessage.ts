import { defineMessages } from 'react-intl';

const prefix = 'lookup.infor';

// page
export const inforPage = defineMessages({
  uploadTitle: { id: `${prefix}.page.upload.title`},
  uploadSubHeader: { id: `${prefix}.page.upload.subHeader`},
});

// messages
export const inforMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  uploadSuccess: { id: `${prefix}.message.upload.success` },
  uploadFailure: { id: `${prefix}.message.upload.failure` },
});

// field
export const inforField = defineMessages({
  file: { id: `${prefix}.field.file`},
  filePlaceholder: { id: `${prefix}.field.file.placeholder`},
  fileRequired: { id: `${prefix}.field.file.required`},
  
});

// section
export const inforSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title`},
  infoSubHeader: { id: `${prefix}.section.info.subHeader`},
});

// helper
export const inforFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'file': return inforField.file;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'file': return inforField.fileRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'file': return inforField.filePlaceholder;

      default: return {id: field};
    }
  }

  return {id: field};
};
