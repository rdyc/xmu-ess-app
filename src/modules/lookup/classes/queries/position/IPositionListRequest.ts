import { IPositionListFilter } from '@lookup/classes/filters';

export interface IPositionListRequest {
  readonly filter: IPositionListFilter | undefined;
}