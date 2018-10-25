import { ILeaveListFilter } from '@lookup/classes/filters';

export interface ILeaveListRequest {
  readonly filter: ILeaveListFilter | undefined;
}