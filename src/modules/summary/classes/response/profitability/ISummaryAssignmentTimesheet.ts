import { IAccountEmployee } from '@account/classes';

export interface ISummaryAssignmentTimesheet {
  employeeUid: string;
  employee?: IAccountEmployee | null;
  role: string[];
  mandays: number;
  allocatedHours: number;
  actualHours: number;
  remainHours: number;
  progress: number;
  actualRate: number;
}