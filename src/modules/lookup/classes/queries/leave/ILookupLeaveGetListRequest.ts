import { ILookupLeaveGetListFilter } from '@lookup/classes/filters';

export interface ILookupLeaveGetListRequest {
  readonly filter: ILookupLeaveGetListFilter | undefined;
}