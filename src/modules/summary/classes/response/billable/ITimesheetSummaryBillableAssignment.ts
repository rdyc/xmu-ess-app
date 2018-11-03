import { IPosition } from '@lookup/classes/response';
import { IProject } from '@project/classes/response';

export interface ITimesheetSummaryBillableAssignment {
  projectUid: string;
  project?: IProject | null;
  positionUid: string;
  position?: IPosition | null;
  role: string[];
  allocatedHours: number;
  actualHours: number;
  actualPercentage: number;
}