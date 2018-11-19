import { WorkflowStatusType } from '@common/classes/types';
import { ExpenseField } from '@expense/classes/types';
import { ICollectionValue } from '@layout/classes/core';

export const expenseFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  // replace project type
  // if (field.name === ProjectRegistrationField.projectType) {
  //   switch (find.toLowerCase()) {
  //     case 'project':
  //       result = ProjectType.Project;
  //       break;
      
  //     case 'pre sale':
  //     case 'pre sales':
  //     case 'presales':
  //       result = ProjectType.PreSales;
  //       break;
      
  //     case 'extra mile':
  //     case 'extra miles':
  //       result = ProjectType.ExtraMiles;
  //       break;

  //     case 'non project':
  //       result = ProjectType.NonProject;
  //       break;

  //     default:
  //       break;
  //   }
  // }

  // replace status type
  if (field.name === ExpenseField.statusType) {
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