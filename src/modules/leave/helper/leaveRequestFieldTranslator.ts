import { LeaveType, WorkflowStatusType } from '@common/classes/types';
import { ICollectionValue } from '@layout/classes/core';
import { LeaveRequestField } from '@leave/classes/types';

export const leaveRequestFieldTranslator = (find: string, field: ICollectionValue): string => {
  let result: string = find;

  // replace project type
  if (field.name === LeaveRequestField.leaveType) {
    switch (find.toLowerCase()) {
      case 'cuti tahunan':
      case 'annual leave':
      case 'annual':
        result = LeaveType.CutiTahunan;
        break;
      
      case 'cuti khusus':
      case 'regular leave':
      case 'regular':
        result = LeaveType.CutiKhusus;
        break;

      default:
        break;
    }
  }

  // replace status type
  if (field.name === LeaveRequestField.statusType) {
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

  return result;
};