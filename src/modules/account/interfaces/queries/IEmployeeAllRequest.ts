import { IEmployeeAllFilter } from '@account/interfaces/filters';

export interface IEmployeeAllRequest {
  readonly filter: IEmployeeAllFilter | undefined;
}