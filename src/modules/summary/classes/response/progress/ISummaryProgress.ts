import { ICommonSystem } from '@common/classes';
import { ISummaryAssignment, ISummaryModuleCost } from '@summary/classes/response/progress';

export interface ISummaryProgress {
  projectUid: string;
  projectType?: string | null;
  project: ICommonSystem;
  name: string;
  valueIdr: number;
  maxHours: number;
  actualHours: number;
  remainHours: number;
  progress: number;
  actualRates: number;
  actualCosts: number;
  cogs: number;
  assignments?: ISummaryAssignment[] | null;
  moduleCosts?: ISummaryModuleCost[] | null;
}