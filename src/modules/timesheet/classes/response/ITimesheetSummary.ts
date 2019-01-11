import { IAccountEmployee } from '@account/classes';
import { ITimesheetSummaryDetail } from './ITimesheetSummaryDetail';

export interface ITimesheetSummary {
  employeeUid: string;
  employee?: IAccountEmployee;
  totalCustomers: number;
  totalProjects: number;
  totalMandays: number;
  assingedHours: number;
  actualHours: number;
  remainHours: number;
  details?: ITimesheetSummaryDetail[];
}