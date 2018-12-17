import { IMenuGetAllFilter } from '@lookup/classes/filters/menu';

export interface IMenuGetAllRequest {
  readonly filter: IMenuGetAllFilter | undefined;
}