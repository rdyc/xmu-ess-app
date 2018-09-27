import { IEmployeeListFilter } from '@account/interfaces/filters';

export interface IEmployeeListRequest {
  readonly filter: IEmployeeListFilter | undefined;
}