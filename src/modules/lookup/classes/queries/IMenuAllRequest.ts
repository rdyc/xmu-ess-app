import { IMenuAllFilter } from '@lookup/classes/filters';

export interface IMenuAllRequest {
  readonly filter: IMenuAllFilter | undefined;
}