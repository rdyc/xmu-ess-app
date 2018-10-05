import { IPositionAllFilter } from '@lookup/classes/filters';

export interface IPositionAllRequest {
  readonly filter: IPositionAllFilter | undefined;
}