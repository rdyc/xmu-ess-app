import { WorkflowStatusType } from '@common/classes/types';
import { ICollectionValue } from '@layout/classes/core';
import { TimesheetEntryField } from '@timesheet/classes/types';

export const timesheetEntryFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  // replace activity type
  if (field.name === TimesheetEntryField.statusType) {
    switch (find.toLowerCase()) {
      case 'submit':
      case 'submitted':
        result = WorkflowStatusType.Submitted;
        break;

      case 'approve':
      case 'approved':
        result = WorkflowStatusType.Approved;
        break;

      case 'reject':
      case 'rejected':
        result = WorkflowStatusType.Rejected;
        break;
      
      default:
        break;
    }
  }

  return result;
};