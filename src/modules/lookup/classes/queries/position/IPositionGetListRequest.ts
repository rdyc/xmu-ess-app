import { IPositionGetListFilter } from '@lookup/classes/filters';

export interface IPositionGetListRequest {
  readonly filter: IPositionGetListFilter | undefined;
}