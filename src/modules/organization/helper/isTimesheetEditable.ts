import { WorkflowStatusType } from '@common/classes/types';

export const isTimesheetEditable = (statusType: string): boolean => {
  let result = false;

  const statusTypes: string[] = [
    WorkflowStatusType.Submitted
  ];
   
  result = statusTypes.indexOf(statusType) !== -1;

  return result;
};