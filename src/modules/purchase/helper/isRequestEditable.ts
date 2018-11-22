import { WorkflowStatusType } from '@common/classes/types';

export const isRequestEditable = (statusType: string): boolean => {
  let result = false;

  const statusTypes: string[] = [
    WorkflowStatusType.Submitted,
    WorkflowStatusType.InProgress,
  ];

  result = statusTypes.indexOf(statusType) !== -1;

  return result;
};