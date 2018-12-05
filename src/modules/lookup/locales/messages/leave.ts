import { defineMessages } from 'react-intl';

const prefix = 'lookup.leave';

// page
export const leavePage = defineMessages({
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
export const leaveConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  // closeTitle: { id: `${prefix}.confirm.close.title` },
  // closeDescription: { id: `${prefix}.confirm.close.description` },
});

// section
export const leaveSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
});

// field
export const leaveField = defineMessages({
  uid: { id: `${prefix}.field.id`},
  uidPlaceholder: {id: `${prefix}.field.id.placeholder`},

  company: { id: `${prefix}.field.company`},
  companyRequired: {id: `${prefix}.field.company.required`},
  companyPlaceholder: {id: `${prefix}.field.company.placeholder`},

  category: { id: `${prefix}.field.category`},
  categoryRequired: {id: `${prefix}.field.category.required`},
  categoryPlaceholder: {id: `${prefix}.field.category.placeholder`},

  name: { id: `${prefix}.field.name`},
  nameRequired: {id: `${prefix}.field.name.required`},
  namePlaceholder: {id: `${prefix}.field.name.placeholder`},

  description: { id: `${prefix}.field.description`},
  descriptionRequired: {id: `${prefix}.field.description.required`},
  descriptionPlaceholder: {id: `${prefix}.field.description.placeholder`},
  
  year: { id: `${prefix}.field.year`},
  yearRequired: {id: `${prefix}.field.year.required`},
  yearPlaceholder: {id: `${prefix}.field.year.placeholder`},

  allocation: { id: `${prefix}.field.allocation`},
  allocationRequired: {id: `${prefix}.field.allocation.required`},
  allocationPlaceholder: {id: `${prefix}.field.allocation.placeholder`},

  isWithinHoliday: { id: `${prefix}.field.isWithinHoliday`},
  notWithinHoliday: {id: `${prefix}.field.notWithinHoliday`},
  isWithinHolidayPlaceholder: {id: `${prefix}.field.isWithinHoliday.placeholder`},
  
  filterCompany: { id: `${prefix}.field.filter.company`},
  filterCompanyPlaceholder: { id: `${prefix}.field.filter.company.placeholder`},
});

export const leaveFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return leaveField.uid;
      case 'companyUid': return leaveField.company;
      case 'company': return leaveField.company;
      case 'categoryType': return leaveField.category;
      case 'category': return leaveField.category;
      case 'name': return leaveField.name;
      case 'description': return leaveField.description;
      case 'year': return leaveField.year;
      case 'allocation': return leaveField.allocation;
      case 'isWithinHoliday': return leaveField.isWithinHoliday;
          
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'companyUid': return leaveField.companyRequired;
      case 'company': return leaveField.companyRequired;
      case 'categoryType': return leaveField.categoryRequired;
      case 'category': return leaveField.categoryRequired;
      case 'name': return leaveField.nameRequired;
      case 'description': return leaveField.descriptionRequired;
      case 'year': return leaveField.yearRequired;
      case 'allocation': return leaveField.allocationRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return leaveField.uidPlaceholder;
      case 'companyUid': return leaveField.companyPlaceholder;
      case 'company': return leaveField.companyPlaceholder;
      case 'categoryType': return leaveField.categoryPlaceholder;
      case 'category': return leaveField.categoryPlaceholder;
      case 'name': return leaveField.namePlaceholder;
      case 'description': return leaveField.descriptionPlaceholder;
      case 'year': return leaveField.yearPlaceholder;
      case 'allocation': return leaveField.allocationPlaceholder;
      case 'isWithinHoliday': return leaveField.isWithinHolidayPlaceholder;
      
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const leaveMessage = defineMessages({
  emptyLeaveUid: { id: `${prefix}.message.empty.leaveUid` },
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
  deleteSuccess: { id: `${prefix}.message.delete.success`},
  deleteFailure: { id: `${prefix}.message.delete.failure`},
});