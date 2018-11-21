import { defineMessages } from 'react-intl';

const prefix = 'timesheet.entry';

export const timesheetEntryMessage = defineMessages({
  emptyTimesheetUid: { id: 'timesheet.message.entry.empty.timesheetUid' },
  createSuccess: { id: 'timesheet.message.entry.create.success' },
  createFailure: { id: 'timesheet.message.entry.create.failure' },
  updateSuccess: { id: 'timesheet.message.entry.update.success' },
  updateFailure: { id: 'timesheet.message.entry.update.failure' },
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
  
  notes: { id: `${prefix}.field.information.notes` },
  notesPlaceholder: { id: `${prefix}.field.information.notes.placeholder` },
});