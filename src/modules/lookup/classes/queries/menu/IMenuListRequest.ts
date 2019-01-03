import { IMenuListFilter } from '@lookup/classes/filters/menu';

export interface IMenuListRequest {
  readonly filter: IMenuListFilter | undefined;
}