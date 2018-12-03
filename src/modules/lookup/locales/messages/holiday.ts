import { defineMessages } from 'react-intl';

const prefix = 'lookup.holiday';

// page
export const holidayPage = defineMessages({
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
export const holidayConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  // closeTitle: { id: `${prefix}.confirm.close.title` },
  // closeDescription: { id: `${prefix}.confirm.close.description` },
});

// section
export const holidaySection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
});

// field
export const holidayField = defineMessages({
  uid: { id: `${prefix}.field.id`},
  uidPlaceholder: {id: `${prefix}.field.uid.placeholder`},

  company: { id: `${prefix}.field.company`},
  companyRequired: {id: `${prefix}.field.company.required`},
  companyPlaceholder: {id: `${prefix}.field.company.placeholder`},

  description: { id: `${prefix}.field.description`},
  descriptionRequired: {id: `${prefix}.field.description.required`},
  descriptionPlaceholder: {id: `${prefix}.field.description.placeholder`},

  date: { id: `${prefix}.field.date`},
  dateRequired: {id: `${prefix}.field.date.required`},
  datePlaceholder: {id: `${prefix}.field.date.placeholder`},
});

export const holidayFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return holidayField.uid;
      case 'companyUid': return holidayField.company;
      case 'description': return holidayField.description;
      case 'date': return holidayField.date;
          
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'companyUid': return holidayField.company;
      case 'description': return holidayField.description;
      case 'date': return holidayField.date;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return holidayField.uidPlaceholder;
      case 'companyUid': return holidayField.companyPlaceholder;
      case 'description': return holidayField.descriptionPlaceholder;
      case 'date': return holidayField.datePlaceholder;
      
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const holidayMessage = defineMessages({
  emptyHolidayUid: { id: `${prefix}.message.empty.holidayUid` },
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});