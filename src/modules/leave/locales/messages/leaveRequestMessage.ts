import { defineMessages } from 'react-intl';

const prefix = 'leave.request';

// message
export const leaveRequestMessage = defineMessages({
  emptyLeaveUid: { id: `${prefix}.message.empty.leaveUid` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});

// page
export const leaveRequestPage = defineMessages({
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

// confirmation
export const leaveRequestConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
});

// dialog
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
  uid: { id: `${prefix}.field.uid` },
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder` },
  
  statusType: { id: `${prefix}.field.statusType` },
  statusTypeRequired: { id: `${prefix}.field.statusType.required` },
  statusTypePlaceholder: { id: `${prefix}.field.statusType.placeholder` },
  
  leaveType: { id: `${prefix}.field.leaveType` },
  leaveTypeRequired: { id: `${prefix}.field.leaveType.required` },
  leaveTypePlaceholder: { id: `${prefix}.field.leaveType.placeholder` },

  regularType: { id: `${prefix}.field.regularType` },
  regularTypeRequired: { id: `${prefix}.field.regularType.required` },
  regularTypePlaceholder: { id: `${prefix}.field.regularType.placeholder` },
  
  start: { id: `${prefix}.field.start` },
  startRequired: { id: `${prefix}.field.start.required` },
  startPlaceholder: { id: `${prefix}.field.start.placeholder` },
  
  end: { id: `${prefix}.field.end` },
  endRequired: { id: `${prefix}.field.end.required` },
  endPlaceholder: { id: `${prefix}.field.end.placeholder` },

  reEntry: { id: `${prefix}.field.reEntry` },
  reEntryRequired: { id: `${prefix}.field.reEntry.required` },
  reEntryPlaceHolder: { id: `${prefix}.field.reEntry.placeholder` },
  
  address: { id: `${prefix}.field.address` },
  addressRequired: { id: `${prefix}.field.address.required` },
  addressPlaceholder: { id: `${prefix}.field.address.placeholder` },
  
  contactNumber: { id: `${prefix}.field.contactNumber` },
  contactNumberRequired: { id: `${prefix}.field.contactNumber.required` },
  contactNumberPlaceholder: { id: `${prefix}.field.contactNumber.placeholder` },
  
  reason: { id: `${prefix}.field.reason` },
  reasonRequired: { id: `${prefix}.field.reason.required` },
  reasonPlaceholder: { id: `${prefix}.field.reason.placeholder` },

  requestedLeave: { id: `${prefix}.field.requestedLeave` },

  employeeUid: { id: `${prefix}.field.employeeUid` },
  employeeUidRequired: { id: `${prefix}.field.employeeUid.required` },
  employeeUidPlaceholder: { id: `${prefix}.field.employeeUid.placeholder` },

  completion: { id: `${prefix}.field.completion` },
  isNotify: { id: `${prefix}.field.isNotify` },
  isRejected: { id: `${prefix}.field.isRejected` },
});

// section
export const leaveRequestSection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  statusTitle: { id: `${prefix}.section.status.title` },
  statusSubHeader: { id: `${prefix}.section.status.subHeader` },
  approvalTitle: { id: `${prefix}.section.approval.title` },
  approvalSubHeader: { id: `${prefix}.section.approval.subHeader` },
  cancellationTitle: { id: `${prefix}.section.cancellation.title` },
  cancellationSubHeader: { id: `${prefix}.section.cancellation.subHeader` },
});

export const leaveRequestFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return leaveRequestField.uid;
      case 'statusType': return leaveRequestField.statusType;
      case 'leaveType': return leaveRequestField.leaveType;
      case 'regularType': return leaveRequestField.regularType;
      case 'start': return leaveRequestField.start;
      case 'end': return leaveRequestField.end;
      case 'address': return leaveRequestField.address;
      case 'contactNumber': return leaveRequestField.contactNumber;
      case 'reason': return leaveRequestField.reason;
      case 'employeeUid': return leaveRequestField.employeeUid;

      default: return { id: field };
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'statusType': return leaveRequestField.statusTypeRequired;
      case 'leaveType': return leaveRequestField.leaveTypeRequired;
      case 'regularType': return leaveRequestField.regularTypeRequired;
      case 'start': return leaveRequestField.startRequired;
      case 'end': return leaveRequestField.endRequired;
      case 'address': return leaveRequestField.addressRequired;
      case 'contactNumber': return leaveRequestField.contactNumberRequired;
      case 'reason': return leaveRequestField.reasonRequired;
      case 'employeeUid': return leaveRequestField.employeeUidRequired;

      default: return { id: field };
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return leaveRequestField.uidPlaceholder;
      case 'statusType': return leaveRequestField.statusTypePlaceholder;
      case 'leaveType': return leaveRequestField.leaveTypePlaceholder;
      case 'regularType': return leaveRequestField.regularTypePlaceholder;
      case 'start': return leaveRequestField.startPlaceholder;
      case 'end': return leaveRequestField.endPlaceholder;
      case 'address': return leaveRequestField.addressPlaceholder;
      case 'contactNumber': return leaveRequestField.contactNumberPlaceholder;
      case 'reason': return leaveRequestField.reasonPlaceholder;
      case 'employeeUid': return leaveRequestField.employeeUidPlaceholder;

      default: return { id: field };
    }
  }

  return { id: field };
};