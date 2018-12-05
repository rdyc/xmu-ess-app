import { defineMessages } from 'react-intl';

const prefix = 'lookup.company';

// page
export const companyPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
});

// confirmation
export const companyConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  // closeTitle: { id: `${prefix}.confirm.close.title` },
  // closeDescription: { id: `${prefix}.confirm.close.description` },
});

// section
export const companySection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
});

// fields
export const companyField = defineMessages({
  uid: {id: `${prefix}.field.uid`},
  uidPlaceholder: {id: `${prefix}.field.uid.placeholder`},

  code: {id: `${prefix}.field.code`},
  codeRequired: {id: `${prefix}.field.code.required`},
  codePlaceholder: {id: `${prefix}.field.code.placeholder`},
  
  name: {id: `${prefix}.field.name`},
  nameRequired: {id: `${prefix}.field.name.required`},
  namePlaceholder: {id: `${prefix}.field.name.placeholder`},
});

export const companyFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return companyField.uid;
      case 'code': return companyField.code;
      case 'name': return companyField.name;
          
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'code': return companyField.code;
      case 'name': return companyField.name;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return companyField.uidPlaceholder;
      case 'code': return companyField.codePlaceholder;
      case 'name': return companyField.namePlaceholder;
      
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const companyMessage = defineMessages({
  emptyCompanyUid: { id: `${prefix}.message.empty.companyUid` },
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success` },
  deleteFailure: { id: `${prefix}.message.delete.failure` },
});