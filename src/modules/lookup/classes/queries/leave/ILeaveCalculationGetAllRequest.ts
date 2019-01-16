import { ILeaveCalculationGetAllFilter } from '@lookup/classes/filters';

export interface ILeaveCalculationGetAllRequest {
  filter?: ILeaveCalculationGetAllFilter;
  companyUid: string;
  year: number;
}