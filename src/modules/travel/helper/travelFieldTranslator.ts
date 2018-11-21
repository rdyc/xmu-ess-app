import { WorkflowStatusType } from '@common/classes/types';
import { ICollectionValue } from '@layout/classes/core';
import { TravelRequestField } from '@travel/classes/types';

export const travelFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  // replace status type
  if (field.name === TravelRequestField.statusType) {
    switch (find.toLowerCase()) {
      case 'submit':
      case 'submitted':
        result = WorkflowStatusType.Submitted;
        break;
      
      case 'in progress':
      case 'on progress':
      case 'progress':
        result = WorkflowStatusType.InProgress;
        break;

      case 'approve':
      case 'approved':
        result = WorkflowStatusType.Approved;
        break;

      case 'reject':
      case 'rejected':
        result = WorkflowStatusType.Rejected;
        break;

      case 'notif':
      case 'notify':
        result = WorkflowStatusType.Notify;
        break;

      case 'open':
      case 'opened':
          result = WorkflowStatusType.Opened;
          break;
      
      case 'reopen':
      case 'reopened':
      case 're open':
      case 're opened':
        result = WorkflowStatusType.ReOpened;
        break;

      case 'close':
      case 'closed':
        result = WorkflowStatusType.Closed;
        break;

      default:
        break;
    }
  }

  return result;
};