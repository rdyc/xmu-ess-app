import { ILeaveCalculationGetAllFilter } from '@lookup/classes/filters';

export interface ILeaveCalculationGetAllRequest {
  readonly filter: ILeaveCalculationGetAllFilter | undefined;
}