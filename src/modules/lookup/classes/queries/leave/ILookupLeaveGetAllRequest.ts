import { ILookupLeaveGetAllFilter } from '@lookup/classes/filters';

export interface ILookupLeaveGetAllRequest {
  readonly filter: ILookupLeaveGetAllFilter | undefined;
}