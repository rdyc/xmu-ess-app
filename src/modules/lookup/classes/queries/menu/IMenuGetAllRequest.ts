import { IMenuGetAllFilter } from '@lookup/classes/filters';

export interface IMenuGetAllRequest {
  readonly filter: IMenuGetAllFilter | undefined;
}