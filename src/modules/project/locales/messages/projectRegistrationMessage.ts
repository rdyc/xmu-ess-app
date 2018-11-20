import { defineMessages } from 'react-intl';

const prefix = 'project.registration';

// message
export const projectRegistrationMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  emptyDocument: { id: `${prefix}.message.emptyProps` },
  emptySales: { id: `${prefix}.message.emptyProps` },
  emptySite: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
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