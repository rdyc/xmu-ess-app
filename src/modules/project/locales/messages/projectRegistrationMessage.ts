import { defineMessages } from 'react-intl';

const prefix = 'project.registration';

// page
export const projectRegistrationPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
  
  ownerModifyTitle: { id: `${prefix}.page.owner.modify.title` },
  ownerModifySubHeader: { id: `${prefix}.page.owner.modify.subHeader` },

  hourModifyTitle: { id: `${prefix}.page.hour.modify.title` },
  hourModifySubHeader: { id: `${prefix}.page.hour.modify.subHeader` },
  
  statusModifyTitle: { id: `${prefix}.page.status.modify.title` },
  statusModifySubHeader: { id: `${prefix}.page.status.modify.subHeader` }
});

// page
export const projectAdministrationPage = defineMessages({
  listTitle: { id: `project.administration.page.list.title` },
  listSubHeader: { id: `project.administration.page.list.subHeader` },
});

// option
export const projectRegistrationOption = defineMessages({
  close: { id: `${prefix}.option.close` },
  reOpen: { id: `${prefix}.option.reOpen` },
  owner: { id: `${prefix}.option.owner` },
  hour: { id: `${prefix}.option.hour` },
  site: { id: `${prefix}.option.site` }
});

// confimation
export const projectRegistrationConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  closeTitle: { id: `${prefix}.confirm.close.title` },
  closeDescription: { id: `${prefix}.confirm.close.description` },
  reOpenTitle: { id: `${prefix}.confirm.reOpen.title` },
  reOpenDescription: { id: `${prefix}.confirm.reOpen.description` },
  changeOwnerTitle: { id: `${prefix}.confirm.changeOwner.title` },
  changeOwnerDescription: { id: `${prefix}.confirm.changeOwner.description` },
  adjustHourTitle: { id: `${prefix}.confirm.adjustHour.title` },
  adjustHourDescription: { id: `${prefix}.confirm.adjustHour.description` },
  manageSiteTitle: { id: `${prefix}.confirm.manageSite.title` },
  manageSiteDescription: { id: `${prefix}.confirm.manageSite.description` },
});

// section
export const projectRegistrationSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  documentProjectTitle: { id: `${prefix}.section.document.project.title` },
  documentProjectSubHeader: { id: `${prefix}.section.document.project.subHeader` },
  documentPreSalesTitle: { id: `${prefix}.section.document.preSales.title` },
  documentPreSalesSubHeader: { id: `${prefix}.section.document.preSales.subHeader` },
  salesTitle: { id: `${prefix}.section.sales.title` },
  salesSubHeader: { id: `${prefix}.section.sales.subHeader` },
  siteTitle: { id: `${prefix}.section.site.title` },
  siteSubHeader: { id: `${prefix}.section.site.subHeader` },
  ownerTitle: { id: `${prefix}.section.owner.title` },
  ownerSubHeader: { id: `${prefix}.section.owner.subHeader` },
  hourTitle: { id: `${prefix}.section.hour.title` },
  hourSubHeader: { id: `${prefix}.section.hour.subHeader` },
  statusTitle: { id: `${prefix}.section.status.title` },
  statusSubHeader: { id: `${prefix}.section.status.subHeader` },
  approvalTitle: { id: `${prefix}.section.approval.title` },
  approvalSubHeader: { id: `${prefix}.section.approval.subHeader` },
});

// fields
export const projectRegistrationField = defineMessages({
  // registration
  uid: { id: `${prefix}.field.uid` },
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder` },
  
  childUid: { id: `${prefix}.field.childUid` },

  name: { id: `${prefix}.field.name` },
  nameRequired: { id: `${prefix}.field.name.required` },
  namePlaceholder: { id: `${prefix}.field.name.placeholder` },
  
  description: { id: `${prefix}.field.description` },
  descriptionPlaceholder: { id: `${prefix}.field.description.placeholder` },
  
  statusType: { id: `${prefix}.field.statusType` },
  statusTypeRequired: { id: `${prefix}.field.statusType.required` },
  statusTypePlaceholder: { id: `${prefix}.field.statusType.placeholder` },
  
  projectType: { id: `${prefix}.field.projectType` },
  projectTypeRequired: { id: `${prefix}.field.projectType.required` },
  projectTypePlaceholder: { id: `${prefix}.field.projectType.placeholder` },
  
  customerUid: { id: `${prefix}.field.customerUid` },
  customerUidRequired: { id: `${prefix}.field.customerUid.required` },
  customerUidPlaceholder: { id: `${prefix}.field.customerUid.placeholder` },
  
  start: { id: `${prefix}.field.start` },
  startRequired: { id: `${prefix}.field.start.required` },
  startPlaceholder: { id: `${prefix}.field.start.placeholder` },
  
  end: { id: `${prefix}.field.end` },
  endRequired: { id: `${prefix}.field.end.required` },
  endPlaceholder: { id: `${prefix}.field.end.placeholder` },
  
  contractNumber: { id: `${prefix}.field.contractNumber` },
  contractNumberRequired: { id: `${prefix}.field.contractNumber.required` },
  contractNumberPlaceholder: { id: `${prefix}.field.contractNumber.placeholder` },
  
  employeeUid: { id: `${prefix}.field.employeeUid` },
  employeeUidRequired: { id: `${prefix}.field.employeeUid.required` },
  employeeUidPlaceholder: { id: `${prefix}.field.employeeUid.placeholder` },
  
  ownerEmployeeUid: { id: `${prefix}.field.ownerEmployeeUid` },
  ownerEmployeeUidRequired: { id: `${prefix}.field.ownerEmployeeUid.required` },
  ownerEmployeeUidPlaceholder: { id: `${prefix}.field.ownerEmployeeUid.placeholder` },
  
  currencyType: { id: `${prefix}.field.currencyType` },
  currencyTypeRequired: { id: `${prefix}.field.currencyType.required` },
  currencyTypePlaceholder: { id: `${prefix}.field.currencyType.placeholder` },
  
  rate: { id: `${prefix}.field.rate` },
  rateRequired: { id: `${prefix}.field.rate.required` },
  ratePlaceholder: { id: `${prefix}.field.rate.placeholder` },
  
  valueUsd: { id: `${prefix}.field.valueUsd` },
  valueUsdRequired: { id: `${prefix}.field.valueUsd.required` },
  valueUsdPlaceholder: { id: `${prefix}.field.valueUsd.placeholder` },
  
  valueIdr: { id: `${prefix}.field.valueIdr` },
  
  hours: { id: `${prefix}.field.hours` },
  hoursRequired: { id: `${prefix}.field.hours.required` },
  hoursPlaceholder: { id: `${prefix}.field.hours.placeholder` },

  sales: { id: `${prefix}.field.sales` },
  salesRequired: { id: `${prefix}.field.sales.required` },
  salesPlaceholder: { id: `${prefix}.field.sales.placeholder` },

  rejectedReason: { id: `${prefix}.field.rejectedReason` },

  completion: { id: `${prefix}.field.completion` },
  isNotify: { id: `${prefix}.field.isNotify` },
  isRejected: { id: `${prefix}.field.isRejected` },
  isNewOwner: { id: `${prefix}.field.isNewOwner` }
});

export const projectRegistrationFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return projectRegistrationField.uid;
      case 'name': return projectRegistrationField.name;
      case 'description': return projectRegistrationField.description;
      case 'statusType': return projectRegistrationField.statusType;
      case 'projectType': return projectRegistrationField.projectType;
      case 'customerUid': return projectRegistrationField.customerUid;
      case 'start': return projectRegistrationField.start;
      case 'end': return projectRegistrationField.end;
      case 'contractNumber': return projectRegistrationField.contractNumber;
      case 'employeeUid': return projectRegistrationField.employeeUid;
      case 'ownerEmployeeUid': return projectRegistrationField.ownerEmployeeUid;
      case 'currencyType': return projectRegistrationField.currencyType;
      case 'rate': return projectRegistrationField.rate;
      case 'valueUsd': return projectRegistrationField.valueUsd;
      case 'valueIdr': return projectRegistrationField.valueIdr;
      case 'hours': return projectRegistrationField.hours;
      case 'sales': return projectRegistrationField.sales;
    
      default: return {id: field};
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'name': return projectRegistrationField.nameRequired;
      case 'statusType': return projectRegistrationField.statusTypeRequired;
      case 'projectType': return projectRegistrationField.projectTypeRequired;
      case 'customerUid': return projectRegistrationField.customerUidRequired;
      case 'start': return projectRegistrationField.startRequired;
      case 'end': return projectRegistrationField.endRequired;
      case 'contractNumber': return projectRegistrationField.contractNumberRequired;
      case 'employeeUid': return projectRegistrationField.employeeUidRequired;
      case 'ownerEmployeeUid': return projectRegistrationField.ownerEmployeeUidRequired;
      case 'currencyType': return projectRegistrationField.currencyTypeRequired;
      case 'rate': return projectRegistrationField.rateRequired;
      case 'valueUsd': return projectRegistrationField.valueUsdRequired;
      case 'hours': return projectRegistrationField.hoursRequired;
      case 'sales': return projectRegistrationField.salesRequired;

      default: return {id: field};
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return projectRegistrationField.uidPlaceholder;
      case 'name': return projectRegistrationField.namePlaceholder;
      case 'description': return projectRegistrationField.descriptionPlaceholder;
      case 'statusType': return projectRegistrationField.statusTypePlaceholder;
      case 'projectType': return projectRegistrationField.projectTypePlaceholder;
      case 'customerUid': return projectRegistrationField.customerUidPlaceholder;
      case 'start': return projectRegistrationField.startPlaceholder;
      case 'end': return projectRegistrationField.endPlaceholder;
      case 'contractNumber': return projectRegistrationField.contractNumberPlaceholder;
      case 'employeeUid': return projectRegistrationField.employeeUidPlaceholder;
      case 'ownerEmployeeUid': return projectRegistrationField.ownerEmployeeUidPlaceholder;
      case 'currencyType': return projectRegistrationField.currencyTypePlaceholder;
      case 'rate': return projectRegistrationField.ratePlaceholder;
      case 'valueUsd': return projectRegistrationField.valueUsdPlaceholder;
      case 'hours': return projectRegistrationField.hoursPlaceholder;
      case 'sales': return projectRegistrationField.salesPlaceholder;
    
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const projectRegistrationMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  emptyDocument: { id: `${prefix}.message.emptyDocument` },
  emptySite: { id: `${prefix}.message.emptySite` },
  emptySales: { id: `${prefix}.message.emptySales` },
  duplicateSales: { id: `${prefix}.message.duplicateSales` },
  undefinedSales: { id: `${prefix}.message.undefinedSales` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});