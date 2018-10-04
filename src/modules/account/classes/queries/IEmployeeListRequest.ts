import { IEmployeeListFilter } from '@account/classes/filters';

export interface IEmployeeListRequest {
  readonly filter: IEmployeeListFilter | undefined;
}