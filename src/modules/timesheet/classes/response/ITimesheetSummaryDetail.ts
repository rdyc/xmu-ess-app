import { ILookupCustomer } from '@lookup/classes';
import { IProject } from '@project/classes/response';

export interface ITimesheetSummaryDetail {
  customerUid: string;
  customer?: ILookupCustomer;
  projectUid: string;
  project?: IProject;
  assignment?: string; // blm ada
  actualHours: number;
}