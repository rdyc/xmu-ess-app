import { IEmployeeAccessHistoryListFilter } from '@account/classes/filters/employeeAccessHistory';

export interface IEmployeeAccessHistoryListRequest {
  employeeUid: string;
  filter?: IEmployeeAccessHistoryListFilter;
}