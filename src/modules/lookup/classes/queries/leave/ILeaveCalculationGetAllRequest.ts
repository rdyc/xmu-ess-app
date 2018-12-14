import { ILeaveCalculationGetAllFilter } from '@lookup/classes/filters';

export interface ILeaveCalculationGetAllRequest {
  companyUid: string;
  year: string;
  readonly filter: ILeaveCalculationGetAllFilter | undefined;
}