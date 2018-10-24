import { ILeaveListFilter } from '@lookup/classes/filters';

export interface ILeaveGetListRequest {
  readonly filter: ILeaveListFilter | undefined;
}