import { IEmployeeAllFilter } from '@account/classes/filters';

export interface IEmployeeAllRequest {
  readonly filter: IEmployeeAllFilter | undefined;
}