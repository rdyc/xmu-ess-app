import { defineMessages } from 'react-intl';

const prefix = 'travel.request';

export const travelRequestPage = defineMessages({
  listTitle: { id: `${prefix}.page.list.title` },
  listSubHeader: { id: `${prefix}.page.list.subHeader` },
  detailTitle: { id: `${prefix}.page.detail.title` },
  detailSubHeader: { id: `${prefix}.page.detail.subHeader` },
  newTitle: { id: `${prefix}.page.new.title` },
  newSubHeader: { id: `${prefix}.page.new.subHeader` },
  modifyTitle: { id: `${prefix}.page.modify.title` },
  modifySubHeader: { id: `${prefix}.page.modify.subHeader` },
  
  statusModifyTitle: { id: `${prefix}.page.status.modify.title` },
  statusModifySubHeader: { id: `${prefix}.page.status.modify.subHeader` }
});

// confimation
export const travelRequestConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  addSettlementTitle: { id: `${prefix}.confirm.addSettlement.title` },
  addSettlementDescription: { id: `${prefix}.confirm.addSettlement.description` },
});

// section
export const travelRequestSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  itemTitle: { id: `${prefix}.section.item.title` },
  itemSubHeader: { id: `${prefix}.section.item.subHeader` },
  statusTitle: { id: `${prefix}.section.status.title` },
  statusSubHeader: { id: `${prefix}.section.status.subHeader` },
  approvalTitle: { id: `${prefix}.section.approval.title` },
  approvalSubHeader: { id: `${prefix}.section.approval.subHeader` },
});

// fields
export const travelRequestField = defineMessages({
  // registration
  uid: { id: `${prefix}.field.uid` },
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder` },

  employeeUid: { id: `${prefix}.field.employeeUid` },
  employeeUidPlaceholder: { id: `${prefix}.field.employeeUid.placeholder` },
  
  destinationType: { id: `${prefix}.field.destinationType` },
  destinationTypeRequired: { id: `${prefix}.field.destinationType.required` },
  destinationTypePlaceholder: { id: `${prefix}.field.destinationType.placeholder` },
  
  projectUid: { id: `${prefix}.field.projectUid` },
  projectUidRequired: { id: `${prefix}.field.projectUid.required` },
  projectUidPlaceholder: { id: `${prefix}.field.projectUid.placeholder` },
  
  customerUid: { id: `${prefix}.field.customerUid` },
  customerUidRequired: { id: `${prefix}.field.customerUid.required` },
  customerUidPlaceholder: { id: `${prefix}.field.customerUid.placeholder` },
  
  start: { id: `${prefix}.field.start` },
  startRequired: { id: `${prefix}.field.start.required` },
  startPlaceholder: { id: `${prefix}.field.start.placeholder` },
  
  end: { id: `${prefix}.field.end` },
  endRequired: { id: `${prefix}.field.end.required` },
  endPlaceholder: { id: `${prefix}.field.end.placeholder` },

  activityType: { id: `${prefix}.field.activityType` },
  activityTypeRequired: { id: `${prefix}.field.activityType.required` },
  activityTypePlaceholder: { id: `${prefix}.field.activityType.placeholder` },
  
  objective: { id: `${prefix}.field.objective` },
  objectivePlaceholder: { id: `${prefix}.field.objective.placeholder` },

  target: { id: `${prefix}.field.target` },
  targetPlaceholder: { id: `${prefix}.field.target.placeholder` },

  comment: { id: `${prefix}.field.comment` },
  commentPlaceholder: { id: `${prefix}.field.comment.placeholder` },

  total: { id: `${prefix}.field.total` },
});

// message
export const travelRequestMessage = defineMessages({
  emptyProps: { id: `${prefix}.message.emptyProps` },
  emptyItem: { id: `${prefix}.message.emptyItem` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});