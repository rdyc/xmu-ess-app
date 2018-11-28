import { 
  timesheetApprovalConfirm, 
  timesheetApprovalHistoryPage, 
  timesheetApprovalMessage,
  timesheetApprovalPage,
  timesheetApprovalSection
} from './timesheetApprovalMessage';
import { 
  timesheetEntryConfirm, 
  timesheetEntryField, 
  timesheetEntryFieldHelperFor, 
  timesheetEntryMessage, 
  timesheetEntryPage, 
  timesheetEntrySection } from './timesheetEntryMessage';

export const timesheetMessage = {
  entry: {
    page: timesheetEntryPage,
    confirm: timesheetEntryConfirm,
    section: timesheetEntrySection,
    field: timesheetEntryField,
    fieldFor: timesheetEntryFieldHelperFor,
    message: timesheetEntryMessage
  },
  approval: {
    page: timesheetApprovalPage,
    page2: timesheetApprovalHistoryPage,
    section: timesheetApprovalSection,
    confirm: timesheetApprovalConfirm,
    message: timesheetApprovalMessage,
  }
};