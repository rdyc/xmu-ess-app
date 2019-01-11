import { IEmployeeAccessHistoryAllFilter } from '@account/classes/filters/employeeAccessHistory';

export interface IEmployeeAccessHistoryAllRequest {
  employeeUid: string;
  filter: IEmployeeAccessHistoryAllFilter;
}