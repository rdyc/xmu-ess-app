import { IEmployeeAccessHistoryListFilter } from '@account/classes/filters/employeeAccessHistory';

export interface IEmployeeAccessHistoryListRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeAccessHistoryListFilter;
}