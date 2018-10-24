import { ILeaveAllFilter } from '@lookup/classes/filters';

export interface ILeaveAllRequest {
  readonly filter: ILeaveAllFilter | undefined;
}