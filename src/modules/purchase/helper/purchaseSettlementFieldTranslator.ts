import { WorkflowStatusType } from '@common/classes/types';
import { ICollectionValue } from '@layout/classes/core';
import { SettlementField } from '@purchase/classes/types';

export const purchaseSettlementFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  // replace status type
  if (field.name === SettlementField.settlementStatusType || find) {
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
        result = find;
        break;
    }
  }

  return result;
};