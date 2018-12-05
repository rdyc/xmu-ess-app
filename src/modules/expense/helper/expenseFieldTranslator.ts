import { WorkflowStatusType } from '@common/classes/types';
import { ExpenseField } from '@expense/classes/types';
import { ICollectionValue } from '@layout/classes/core';

export const expenseFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  // replace expense type
  // if (field.name === ExpenseField.expenseType) {
  //   switch (find.toLowerCase()) {
  //     case 'bidregistration':
  //     case 'bid registration':
  //     case 'registration':
  //     case 'bid':
  //       result = ExpenseType.BidRegistration;
  //       break;
      
  //     case 'businesstrip':
  //     case 'business':
  //     case 'trip':
  //     case 'business trip':
  //     case 'business trip in city':
  //     case 'business trip city':
  //       result = ExpenseType.BusinessTrip;
  //       break;
      
  //     case 'entertainment':
  //     case 'food':
  //     case 'beverages':
  //     case 'food and beverages':
  //     case 'entertainment, food and beverages':
  //     case 'entertainment food beverages':
  //       result = ExpenseType.Entertainment;
  //       break;

  //     case 'communication':
  //     case 'internalcommunication':
  //     case 'internal communication':
  //     case 'internal comm':
  //       result = ExpenseType.InternalCommunication;
  //       break;

  //     case 'office':
  //     case 'supplies':
  //     case 'officesupplies':
  //     case 'office supplies':
  //       result = ExpenseType.OficeSupplies;
  //       break;

  //     case 'subscription':
  //       result = ExpenseType.Subscription;
  //       break;

  //     case 'telecommunication':
  //     case 'telecomm':
  //     case 'telecom':
  //     case 'communication':
  //       result = ExpenseType.Telecommunication;
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