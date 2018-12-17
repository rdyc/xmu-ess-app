import { WorkflowStatusType } from '@common/classes/types';

export const isSettlementEditable = (statusType: string): boolean => {
  let result = false;

  const statusTypes: string[] = [
    WorkflowStatusType.Submitted,
    WorkflowStatusType.InProgress,
    WorkflowStatusType.Rejected,
  ];

  result = statusTypes.indexOf(statusType) !== -1;

  return result;
};