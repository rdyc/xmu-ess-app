import { WorkflowStatusType } from '@common/classes/types';
import { ICollectionValue } from '@layout/classes/core';
import { PurchaseField } from '@purchase/classes/types';

export const purchaseRequestFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  // replace status type
  if (field.name === PurchaseField.requestStatusType) {
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

      default:
        break;
    }
  }

  // if (field.name === PurchaseField.requestDate) {
  //   switch (find.toLowerCase()) {
      
  //     case 'jan':
  //     case 'january':
  //     case 'januari':
  //       result = 
  //       break;
  //   }
  // }

  return result;
};