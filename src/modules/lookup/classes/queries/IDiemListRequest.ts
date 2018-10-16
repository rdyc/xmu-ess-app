import { IDiemListFilter } from '@lookup/classes/filters';

export interface IDiemListRequest {
  readonly filter: IDiemListFilter | undefined; 
}