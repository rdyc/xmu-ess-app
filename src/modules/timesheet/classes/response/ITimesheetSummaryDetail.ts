import { ILookupCustomer } from '@lookup/classes';
import { IProject } from '@project/classes/response';

export interface ITimesheetSummaryDetail {
  customerUid: string;
  customer: ILookupCustomer | null;
  projectUid: string;
  project: IProject | null;
  assignment: string | null; // blm ada
  actualHours: number;
}