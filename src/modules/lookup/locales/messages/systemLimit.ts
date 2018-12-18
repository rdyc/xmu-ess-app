import { defineMessages } from 'react-intl';

const prefix = 'lookup.systemLimit';

// page
export const systemLimitPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title`},
  newSubHeader: { id: `${prefix}.page.new.subHeader`},
  modifyTitle: { id: `${prefix}.page.modify.title`},
  modifySubHeader: { id: `${prefix}.page.modify.subHeader`},
});

// messages
export const systemLimitMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success`},
  deleteFailure: { id: `${prefix}.message.delete.failure`},
});

// confirmation
export const systemLimitConfirm = defineMessages({
  createTitle: { id: `${prefix}.confirm.create.title` },
  createDescription: { id: `${prefix}.confirm.create.description` },
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  deleteTitle: { id: `${prefix}.confirm.delete.title` },
  deleteDescription: { id: `${prefix}.confirm.delete.description` },
});

// field
export const systemLimitField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},
  
  company: { id: `${prefix}.field.company`},
  companyPlaceholder: { id: `${prefix}.field.company.placeholder`},

  category: { id: `${prefix}.field.category`},
  categoryRequired: { id: `${prefix}.field.category.required`},
  categoryPlaceholder: { id: `${prefix}.field.category.placeholder`},

  days: { id: `${prefix}.field.days`},
  daysRequired: { id: `${prefix}.field.days.required`},
  daysPlaceholder: { id: `${prefix}.field.days.placeholder`},

  infoTitle: { id: `${prefix}.field.info.title`},
  infoSubHeader: { id: `${prefix}.field.info.subHeader`},

  filterCompany: { id: `${prefix}.field.filter.company`},
  filterCompanyPlaceholder: { id: `${prefix}.field.filter.company.placeholder`},

  filterCategory: { id: `${prefix}.field.filter.category`},
  filterCategoryPlaceholder: { id: `${prefix}.field.filter.category.placeholder`},
});

// section
export const systemLimitSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title`},
  infoSubHeader: { id: `${prefix}.section.info.subHeader`},
});

// helper
export const systemLimitFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return systemLimitField.uid;
      case 'companyUid': return systemLimitField.company;
      case 'categoryType': return systemLimitField.category;
      case 'days': return systemLimitField.days;

      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'categoryType': return systemLimitField.categoryRequired;
      case 'days': return systemLimitField.daysRequired;  

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return systemLimitField.uidPlaceholder;
      case 'companyUid': return systemLimitField.companyPlaceholder;
      case 'categoryType': return systemLimitField.categoryPlaceholder;
      case 'days': return systemLimitField.daysPlaceholder;  

      default: return {id: field};
    }
  }

  return {id: field};
};
