import { IRoleAllFilter } from '@lookup/classes/filters';

export interface IRoleAllRequest {
  readonly filter: IRoleAllFilter | undefined;
}