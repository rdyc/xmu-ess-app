import { IDiemListFilter } from '@lookup/classes/filters';

export interface ILookupDiemListRequest {
  readonly filter: IDiemListFilter | undefined; 
}