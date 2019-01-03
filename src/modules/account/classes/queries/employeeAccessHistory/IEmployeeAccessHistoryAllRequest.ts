import { IEmployeeAccessHistoryAllFilter } from '@account/classes/filters/employeeAccessHistory';

export interface IEmployeeAccessHistoryAllRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeAccessHistoryAllFilter;
}