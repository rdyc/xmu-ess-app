import { IPosition } from '@lookup/classes/response';
import { IProject } from '@project/classes/response';

export interface ISummaryEffectivenessAssignment {
  projectUid: string;
  project?: IProject;
  positionUid: string;
  position?: IPosition | null;
  role: string[];
  allocateHours: number;
  actualHours: number;
  remainHours: number;
  percentage: number;
}