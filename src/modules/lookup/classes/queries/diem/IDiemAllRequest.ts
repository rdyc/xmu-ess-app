import { IDiemAllFilter } from '@lookup/classes/filters';

export interface IDiemAllRequest  {
  readonly filter: IDiemAllFilter | undefined;
}