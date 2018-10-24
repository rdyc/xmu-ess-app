import { IPositionGetAllFilter } from '@lookup/classes/filters';

export interface IPositionGetAllRequest {
  readonly filter: IPositionGetAllFilter | undefined;
}