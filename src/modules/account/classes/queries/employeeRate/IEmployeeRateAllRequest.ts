import { IEmployeeRateAllFilter } from '@account/classes/filters/employeeRate';

export interface IEmployeeRateAllRequest {
  employeeUid: string;
  filter?: IEmployeeRateAllFilter;
}