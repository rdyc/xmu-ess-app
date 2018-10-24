import { IMenuListFilter } from '@lookup/classes/filters';

export interface IMenuListRequest {
  readonly filter: IMenuListFilter | undefined;
}