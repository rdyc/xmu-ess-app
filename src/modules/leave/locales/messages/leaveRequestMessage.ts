import { defineMessages } from 'react-intl';

const prefix = 'leave.request';

export const leaveRequestMessage = defineMessages({
  emptyLeaveUid: { id: 'leave.message.request.empty.leaveUid' },
  createSuccess: { id: 'leave.message.request.create.success' },
  createFailure: { id: 'leave.message.request.create.failure' },
  updateSuccess: { id: 'leave.message.request.update.success' },
  updateFailure: { id: 'leave.message.request.update.failure' },
});

export const leaveRequestPage = defineMessages({
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
  
  statusModifyTitle: { id: `${prefix}.page.status.modify.title` },
  statusModifySubHeader: { id: `${prefix}.page.status.modify.subHeader` }
});

export const leaveRequestConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
});

export const leaveRequestDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
  editTitle: { id: `${prefix}.dialog.editTitle`},
  editDescription: { id: `${prefix}.dialog.editDescription`},
});

// fields
export const leaveRequestField = defineMessages({
  uid: { id: `${prefix}.field.information.uid` },
  uidPlaceholder: { id: `${prefix}.field.information.uid.placeholder` },
  
  statusType: { id: `${prefix}.field.information.statusType` },
  statusTypeRequired: { id: `${prefix}.field.information.statusType.required` },
  statusTypePlaceholder: { id: `${prefix}.field.information.statusType.placeholder` },
  
  leaveType: { id: `${prefix}.field.information.leaveType` },
  leaveTypeRequired: { id: `${prefix}.field.information.leaveType.required` },
  leaveTypePlaceholder: { id: `${prefix}.field.information.leaveType.placeholder` },

  regularType: { id: `${prefix}.field.information.regularType` },
  regularTypeRequired: { id: `${prefix}.field.information.regularType.required` },
  regularTypePlaceholder: { id: `${prefix}.field.information.regularType.placeholder` },
  
  start: { id: `${prefix}.field.information.start` },
  startRequired: { id: `${prefix}.field.information.start.required` },
  startPlaceholder: { id: `${prefix}.field.information.start.placeholder` },
  
  end: { id: `${prefix}.field.information.end` },
  endRequired: { id: `${prefix}.field.information.end.required` },
  endPlaceholder: { id: `${prefix}.field.information.end.placeholder` },
  
  contactNumber: { id: `${prefix}.field.information.contactNumber` },
  contactNumberRequired: { id: `${prefix}.field.information.contactNumber.required` },
  contactNumberPlaceholder: { id: `${prefix}.field.information.contactNumber.placeholder` },
  
  reason: { id: `${prefix}.field.information.reason` },
  reasonRequired: { id: `${prefix}.field.information.reason.required` },
  reasonPlaceholder: { id: `${prefix}.field.information.reason.placeholder` },

  employeeUid: { id: `${prefix}.field.information.employeeUid` },
  employeeUidRequired: { id: `${prefix}.field.information.employeeUid.required` },
  employeeUidPlaceholder: { id: `${prefix}.field.information.employeeUid.placeholder` },

  completion: { id: `${prefix}.field.completion` },
  isNotify: { id: `${prefix}.field.isNotify` },
  isRejected: { id: `${prefix}.field.isRejected` },
});

export const leaveRequestSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  statusTitle: { id: `${prefix}.section.status.title` },
  statusSubHeader: { id: `${prefix}.section.status.subHeader` },
  approvalTitle: { id: `${prefix}.section.approval.title` },
  approvalSubHeader: { id: `${prefix}.section.approval.subHeader` },
  cancellationTitle: { id: `${prefix}.section.approval.title` },
  cancellationSubHeader: { id: `${prefix}.section.approval.subHeader` },
});