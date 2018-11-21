import { defineMessages } from 'react-intl';

const prefix = 'leave.request';

export const leaveRequestMessage = defineMessages({
  emptyLeaveUid: { id: 'leave.message.request.empty.leaveUid' },
  createSuccess: { id: 'leave.message.request.create.success' },
  createFailure: { id: 'leave.message.request.create.failure' },
  updateSuccess: { id: 'leave.message.request.update.success' },
  updateFailure: { id: 'leave.message.request.update.failure' },
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
  
});