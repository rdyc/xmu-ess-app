import { IRoleListFilter } from '@lookup/classes/filters';

export interface IRoleListRequest {
  readonly filter: IRoleListFilter | undefined;
}