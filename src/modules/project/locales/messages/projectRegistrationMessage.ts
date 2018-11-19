import { defineMessages } from 'react-intl';

const prefix = 'project.registration';

export const projectRegistrationMessage = defineMessages({
  emptyProjectUid: { id: 'project.message.registration.emptyProps' },
  createSuccess: { id: 'project.message.registration.create.success' },
  createFailure: { id: 'project.message.registration.create.failure' },
  updateSuccess: { id: 'project.message.registration.update.success' },
  updateFailure: { id: 'project.message.registration.update.failure' },
});

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
});

// fields
export const projectRegistrationField = defineMessages({
  uid: { id: `${prefix}.field.information.uid` },
  uidPlaceholder: { id: `${prefix}.field.information.uid.placeholder` },

  name: { id: `${prefix}.field.information.name` },
  nameRequired: { id: `${prefix}.field.information.name.required` },
  namePlaceholder: { id: `${prefix}.field.information.name.placeholder` },
  
  description: { id: `${prefix}.field.information.description` },
  descriptionPlaceholder: { id: `${prefix}.field.information.description.placeholder` },
  
  statusType: { id: `${prefix}.field.information.statusType` },
  statusTypeRequired: { id: `${prefix}.field.information.statusType.required` },
  statusTypePlaceholder: { id: `${prefix}.field.information.statusType.placeholder` },
  
  projectType: { id: `${prefix}.field.information.projectType` },
  projectTypeRequired: { id: `${prefix}.field.information.projectType.required` },
  projectTypePlaceholder: { id: `${prefix}.field.information.projectType.placeholder` },
  
  customerUid: { id: `${prefix}.field.information.customerUid` },
  customerUidRequired: { id: `${prefix}.field.information.customerUid.required` },
  customerUidPlaceholder: { id: `${prefix}.field.information.customerUid.placeholder` },
  
  start: { id: `${prefix}.field.information.start` },
  startRequired: { id: `${prefix}.field.information.start.required` },
  startPlaceholder: { id: `${prefix}.field.information.start.placeholder` },
  
  end: { id: `${prefix}.field.information.end` },
  endRequired: { id: `${prefix}.field.information.end.required` },
  endPlaceholder: { id: `${prefix}.field.information.end.placeholder` },
  
  contractNumber: { id: `${prefix}.field.information.contractNumber` },
  contractNumberPlaceholder: { id: `${prefix}.field.information.contractNumber.placeholder` },
  
  employeeUid: { id: `${prefix}.field.information.employeeUid` },
  employeeUidRequired: { id: `${prefix}.field.information.employeeUid.required` },
  employeeUidPlaceholder: { id: `${prefix}.field.information.employeeUid.placeholder` },
  
  ownerEmployeeUid: { id: `${prefix}.field.information.ownerEmployeeUid` },
  ownerEmployeeUidRequired: { id: `${prefix}.field.information.ownerEmployeeUid.required` },
  ownerEmployeeUidPlaceholder: { id: `${prefix}.field.information.ownerEmployeeUid.placeholder` },
  
  currencyType: { id: `${prefix}.field.information.currencyType` },
  currencyTypeRequired: { id: `${prefix}.field.information.currencyType.required` },
  currencyTypePlaceholder: { id: `${prefix}.field.information.currencyType.placeholder` },
  
  rate: { id: `${prefix}.field.information.rate` },
  rateRequired: { id: `${prefix}.field.information.rate.required` },
  ratePlaceholder: { id: `${prefix}.field.information.rate.placeholder` },
  
  valueUsd: { id: `${prefix}.field.information.valueUsd` },
  valueUsdRequired: { id: `${prefix}.field.information.valueUsd.required` },
  valueUsdPlaceholder: { id: `${prefix}.field.information.valueUsd.placeholder` },
  
  valueIdr: { id: `${prefix}.field.information.valueIdr` },
  
  hours: { id: `${prefix}.field.information.hours` },
});