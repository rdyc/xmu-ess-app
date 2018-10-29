import { IAccountEmployee } from '@account/classes';

export interface ISummaryAssignment {
  employeeUid: string;
  employee?: IAccountEmployee | null;
  role: string[];
  mandays: number;
  allocatedHours: number;
  actualHours: number;
  remainHours: number;
  progress: number;
}