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

// fields
export const timesheetEntryField = defineMessages({
  uid: { id: `${prefix}.field.information.uid` },
  uidPlaceholder: { id: `${prefix}.field.information.uid.placeholder` },

  activityType: { id: `${prefix}.field.information.activityType`},
  activityTypeRequired: { id: `${prefix}.field.information.activityType.required`},
  activityTypePlaceholder: { id: `${prefix}.field.information.activityType.placeholder`},

  customerUid: { id: `${prefix}.field.information.customerUid` },
  customerUidRequired: { id: `${prefix}.field.information.customerUid.required` },
  customerUidPlaceholder: { id: `${prefix}.field.information.customerUid.placeholder` },

  projectUid: { id: `${prefix}.field.information.projectUid` },
  projectUidRequired: { id: `${prefix}.field.information.projectUid.required` },
  projectUidPlaceholder: { id: `${prefix}.field.information.projectUid.placeholder` },

  siteUid: { id: `${prefix}.field.information.siteUid` },
  siteUidRequired: { id: `${prefix}.field.information.siteUid.required` },
  siteUidPlaceholder: { id: `${prefix}.field.information.siteUid.placeholder` },

  siteValue: { id: `${prefix}.field.information.siteValue` },

  totalHours: { id: `${prefix}.field.information.totalHours` },

  statusType: { id: `${prefix}.field.information.statusType` },

  date: { id: `${prefix}.field.information.date` },
  dateRequired: { id: `${prefix}.field.information.date.required` },
  datePlaceholder: { id: `${prefix}.field.information.date.placeholder` },

  start: { id: `${prefix}.field.information.start` },
  startRequired: { id: `${prefix}.field.information.start.required` },
  startPlaceholder: { id: `${prefix}.field.information.start.placeholder` },
  
  end: { id: `${prefix}.field.information.end` },
  endRequired: { id: `${prefix}.field.information.end.required` },
  endPlaceholder: { id: `${prefix}.field.information.end.placeholder` },
  
  notes: { id: `${prefix}.field.information.description` },
  notesPlaceholder: { id: `${prefix}.field.information.description.placeholder` },
});

export const timesheetEntryFieldHelperFor = (field: string, type: 'fieldName' | 'fieldRequired' | 'fieldPlaceholder') => {
  if (type === 'fieldName') {
    switch (field) {
      case 'uid': return timesheetEntryField.uid;
      case 'activityType': return timesheetEntryField.activityType;
      case 'customerUid': return timesheetEntryField.customerUid;
      case 'projectUid': return timesheetEntryField.projectUid;
      case 'siteUid': return timesheetEntryField.siteUid;
      case 'siteValue': return timesheetEntryField.siteValue;
      case 'totalHours': return timesheetEntryField.totalHours;
      case 'statusType': return timesheetEntryField.statusType;
      case 'date': return timesheetEntryField.date;
      case 'start': return timesheetEntryField.start;
      case 'end': return timesheetEntryField.end;
      case 'description': return timesheetEntryField.notes;
    
      default: return {id: field};
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

      default: return {id: field};
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
    
      default: return {id: field};
    }
  }

  return {id: field};
};

// message
export const timesheetEntryMessage = defineMessages({
  emptyTimesheetUid: { id: `${prefix}timesheet.message.empty.timesheetUid` },
  emptyProps: { id: `${prefix}.message.emptyProps` },
  createSuccess: { id: `${prefix}.message.create.success` },
  createFailure: { id: `${prefix}.message.create.failure` },
  updateSuccess: { id: `${prefix}.message.update.success` },
  updateFailure: { id: `${prefix}.message.update.failure` },
});