import { defineMessages } from 'react-intl';

const prefix = 'timesheet.entry';

// page
export const timesheetEntryPage = defineMessages({
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
export const timesheetEntryConfirm = defineMessages({
  modifyTitle: { id: `${prefix}.confirm.modify.title` },
  modifyDescription: { id: `${prefix}.confirm.modify.description` },
  closeTitle: { id: `${prefix}.confirm.close.title` },
  closeDescription: { id: `${prefix}.confirm.close.description` },
});

// section
export const timesheetEntrySection = defineMessages({
  infoTitle: { id: `${prefix}.section.info.title` },
  infoSubHeader: { id: `${prefix}.section.info.subHeader` },
  statusTitle: { id: `${prefix}.section.status.title` },
  statusSubHeader: { id: `${prefix}.section.status.subHeader` },
  approvalTitle: { id: `${prefix}.section.approval.title` },
  approvalSubHeader: { id: `${prefix}.section.approval.subHeader` },
});

export const timesheetEntryDialog = defineMessages({
  modifyTitle: { id: `${prefix}.dialog.modifyTitle`},
  modifyDescription: { id: `${prefix}.dialog.modifyDescription`},
  createTitle: { id: `${prefix}.dialog.newTitle`},
  createDescription: { id: `${prefix}.dialog.newDescription`},
});

// fields
export const timesheetEntryField = defineMessages({
  uid: { id: `${prefix}.field.uid` },
  uidPlaceholder: { id: `${prefix}.field.uid.placeholder` },

  activityType: { id: `${prefix}.field.activityType` },
  activityTypeRequired: { id: `${prefix}.field.activityType.required` },
  activityTypePlaceholder: { id: `${prefix}.field.activityType.placeholder` },

  customerUid: { id: `${prefix}.field.customerUid` },
  customerUidRequired: { id: `${prefix}.field.customerUid.required` },
  customerUidPlaceholder: { id: `${prefix}.field.customerUid.placeholder` },

  projectUid: { id: `${prefix}.field.projectUid` },
  projectUidRequired: { id: `${prefix}.field.projectUid.required` },
  projectUidPlaceholder: { id: `${prefix}.field.projectUid.placeholder` },

  siteUid: { id: `${prefix}.field.siteUid` },
  siteUidRequired: { id: `${prefix}.field.siteUid.required` },
  siteUidPlaceholder: { id: `${prefix}.field.siteUid.placeholder` },

  // mileagePercentage: { id: `${prefix}.field.mileagePercentage` },
  // mileageDescription: { id: `${prefix}.field.mileageDescription` },
  mileageException: { id: `${prefix}.field.mileageException` },

  siteValue: { id: `${prefix}.field.siteValue` },

  totalHours: { id: `${prefix}.field.totalHours` },

  statusType: { id: `${prefix}.field.statusType` },

  date: { id: `${prefix}.field.date` },
  dateRequired: { id: `${prefix}.field.date.required` },
  datePlaceholder: { id: `${prefix}.field.date.placeholder` },

  officeTime: { id: `${prefix}.field.officeTime` },

  start: { id: `${prefix}.field.start` },
  startRequired: { id: `${prefix}.field.start.required` },
  startPlaceholder: { id: `${prefix}.field.start.placeholder` },

  end: { id: `${prefix}.field.end` },
  endRequired: { id: `${prefix}.field.end.required` },
  endPlaceholder: { id: `${prefix}.field.end.placeholder` },
  
  notes: { id: `${prefix}.field.description` },
  notesRequired: { id: `${prefix}.field.description.required` },
  notesPlaceholder: { id: `${prefix}.field.description.placeholder` },

  rejectReason: { id: `${prefix}.field.rejectReason` },

  completion: { id: `${prefix}.field.completion`},
  isRejected: { id: `${prefix}.field.isRejected`},
  isNotify: { id: `${prefix}.field.isNotify` },
});

export const timesheetEntryFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return timesheetEntryField.uid;
      case 'activityType': return timesheetEntryField.activityType;
      case 'customerUid': return timesheetEntryField.customerUid;
      case 'projectUid': return timesheetEntryField.projectUid;
      case 'siteUid': return timesheetEntryField.siteUid;
      // case 'mileagePercentage': return timesheetEntryField.mileagePercentage;
      // case 'mileageDescription': return timesheetEntryField.mileageDescription;
      case 'mileageException': return timesheetEntryField.mileageException;
      case 'siteValue': return timesheetEntryField.siteValue;
      case 'totalHours': return timesheetEntryField.totalHours;
      case 'statusType': return timesheetEntryField.statusType;
      case 'date': return timesheetEntryField.date;
      case 'officeTime': return timesheetEntryField.officeTime;
      case 'start': return timesheetEntryField.start;
      case 'end': return timesheetEntryField.end;
      case 'description': return timesheetEntryField.notes;
      case 'rejectReason': return timesheetEntryField.rejectReason;

      default: return { id: field };
    }
  }

  if (type === 'fieldRequired') {
    switch (field) {
      case 'activityType': return timesheetEntryField.activityTypeRequired;
      case 'customerUid': return timesheetEntryField.customerUidRequired;
      case 'projectUid': return timesheetEntryField.projectUidRequired;
      case 'siteUid': return timesheetEntryField.siteUidRequired;
      case 'date': return timesheetEntryField.dateRequired;
      case 'start': return timesheetEntryField.startRequired;
      case 'end': return timesheetEntryField.endRequired;
      case 'description': return timesheetEntryField.notesRequired;

      default: return { id: field };
    }
  }

  if (type === 'fieldPlaceholder') {
    switch (field) {
      case 'uid': return timesheetEntryField.uidPlaceholder;
      case 'activityType': return timesheetEntryField.activityTypePlaceholder;
      case 'customerUid': return timesheetEntryField.customerUidPlaceholder;
      case 'projectUid': return timesheetEntryField.projectUidPlaceholder;
      case 'siteUid': return timesheetEntryField.siteUidPlaceholder;
      case 'siteUid': return timesheetEntryField.siteUidPlaceholder;
      case 'date': return timesheetEntryField.datePlaceholder;
      case 'start': return timesheetEntryField.startPlaceholder;
      case 'end': return timesheetEntryField.endPlaceholder;
      case 'description': return timesheetEntryField.notesPlaceholder;

      default: return { id: field };
    }
  }

  return { id: field };
};

// message
export const timesheetEntryMessage = defineMessages({
  emptyTimesheetUid: { id: `${prefix}.message.empty.timesheetUid` },
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});