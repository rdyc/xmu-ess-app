import { ILeaveAllFilter } from '@lookup/classes/filters';

export interface ILeaveGetAllRequest {
  readonly filter: ILeaveAllFilter | undefined;
}