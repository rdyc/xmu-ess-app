import { defineMessages } from 'react-intl';

const prefix = 'lookup.diem';

// page
export const lookupDiemPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title`},
  listSubHeader: { id: `${prefix}.page.list.subHeader`},
  detailTitle: { id: `${prefix}.page.detail.title`},
  detailSubHeader: { id: `${prefix}.page.detail.subHeader`},
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
});

// section
export const lookupDiemSection = defineMessages({
  infoTitle: { id: `${prefix}.section.diem.title` },
  infoSubHeader: { id: `${prefix}.section.diem.subHeader` },
  diemTitle: { id: `${prefix}.section.diem.title` },
  diemSubHeader: { id: `${prefix}.section.diem.subHeader` },

});

// confirmation
export const lookupDiemConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  
});

// field
export const lookupDiemField = defineMessages({
  uid: { id: `${prefix}.field.uid`},
  uidRequired: { id: `${prefix}.field.uid.required`},
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder`},
  destination: { id: `${prefix}.field.destinationType`},
  destinationRequired: { id: `${prefix}.field.destinationType.required`},
  destinationPlaceholder: { id: `${prefix}.field.destinationType.placeholder`},
  project: { id: `${prefix}.field.projectType`},
  projectRequired: { id: `${prefix}.field.projectType.required`},
  projectPlaceholder: { id: `${prefix}.field.projectType.placeholder`},
  company: { id: `${prefix}.field.companyUid`},
  companyRequired: { id: `${prefix}.field.companyUid.required`},
  companyPlaceholder: { id: `${prefix}.field.companyUid.placeholder`},
  currency: { id: `${prefix}.field.currencyUid`},
  currencyRequired: { id: `${prefix}.field.currencyUid.required`},
  currencyPlaceholder: { id: `${prefix}.field.currencyUid.placeholder`},
  travel: { id: `${prefix}.field.travelType`},
  travelRequired: { id: `${prefix}.field.travelType.required`},
  travelPlaceholder: { id: `${prefix}.field.travelType.placeholder`},
  value: { id: `${prefix}.field.value`},
  valueRequired: { id: `${prefix}.field.value.required`},
  valuePlaceholder: { id: `${prefix}.field.value.placeholder`},
  filterCompany: { id: `${prefix}.field.filter.company`},
  filterCompanyPlaceholder: { id: `${prefix}.field.filter.company.placeholder`},
  filterDestination: { id: `${prefix}.field.filter.destination`},
  filterDestinationplaceholder: { id: `${prefix}.field.filter.destination.placeholder`},
  
  infoTitle: { id: `${prefix}.field.info.title`},
  infoSubHeader: { id: `${prefix}.field.info.subHeader`},
});

export const lookupDiemMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

export const diemFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid' : return lookupDiemField.uid;
      case 'destinationType': return lookupDiemField.destination;
      case 'companyUid': return lookupDiemField.company;
      case 'currencyUid': return lookupDiemField.currency;
      case 'projectType': return lookupDiemField.project;
      case 'value': return lookupDiemField.value;
          
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'uid' : return lookupDiemField.uidRequired;
      case 'destinationType': return lookupDiemField.destinationRequired;
      case 'companyUid': return lookupDiemField.companyRequired;
      case 'currencyUid': return lookupDiemField.currencyRequired;
      case 'projectType': return lookupDiemField.projectRequired;
      case 'value': return lookupDiemField.valueRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid' : return lookupDiemField.uidPlaceholder;
      case 'destinationType': return lookupDiemField.destinationPlaceholder;
      case 'companyUid': return lookupDiemField.companyPlaceholder;
      case 'currencyUid': return lookupDiemField.currencyPlaceholder;
      case 'projectType': return lookupDiemField.projectPlaceholder;
      case 'value': return lookupDiemField.valuePlaceholder;
      
      default: return {id: field};
    }
  }

  return {id: field};
};