import { IPosition } from '@lookup/classes/response';
import { IProject } from '@summary/classes/response/shared';

export interface ISummaryEffectivenessAssignment {
  projectUid: string;
  project?: IProject | null;
  positionUid: string;
  position?: IPosition | null;
  role: string[];
  allocateHours: number;
  actualHours: number;
  remainHours: number;
  percentage: number;
}