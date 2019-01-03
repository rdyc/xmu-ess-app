import { WorkflowStatusType } from '@common/classes/types';

export const isSettlementRequestEditable = (statusType: string): boolean => {
  let result = false;

  const statusTypes: string[] = [
    WorkflowStatusType.Submitted, 
    WorkflowStatusType.InProgress,
    WorkflowStatusType.AdjustmentNeeded,
  ];
   
  result = statusTypes.indexOf(statusType) !== -1;

  return result;
};