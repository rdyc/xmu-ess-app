import { ICommonSystem } from '@common/classes';
import { ISummaryAssignmentTimesheet, ISummaryModuleCost } from '@summary/classes/response/profitability';

export interface ISummaryProfitabilityProject {
  projectUid: string;
  projectType?: string | null;
  project: ICommonSystem;
  name: string;
  valueIdr: number;
  maxHours: number;
  allocatedHours: number;
  actualHours: number;
  remainHours: number;
  progress: number;
  actualRates: number;
  actualCosts: number;
  cogs: number;
  assignments?: ISummaryAssignmentTimesheet[] | null;
  moduleCosts?: ISummaryModuleCost[] | null;
}