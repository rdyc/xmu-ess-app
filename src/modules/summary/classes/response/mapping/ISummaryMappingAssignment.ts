import { ILookupPosition } from '@lookup/classes';
import { IProject } from '@project/classes/response';

export interface ISummaryMappingAssignments {
  projectUid: string;
  project?: IProject;
  positionUid: string;
  position?: ILookupPosition;
  role: string[];
  allocatedHours: number;
  actualHours: number;
  allocatedMandays: number;
  actualMandays: number;
}