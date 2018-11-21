import { ILookupPosition } from '@lookup/classes';
import { IProject } from '@summary/classes/response/shared';

export interface ITimesheetSummaryBillableAssignment {
  projectUid: string;
  project?: IProject | null;
  positionUid: string;
  position?: ILookupPosition | null;
  role: string[];
  allocatedHours: number;
  actualHours: number;
  actualPercentage: number;
}