import { ITravelRequestGetAllFilter } from '@travel/classes/filters';

export interface ITravelGetAllRequest {
  readonly filter: ITravelRequestGetAllFilter | undefined;
}