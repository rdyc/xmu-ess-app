import { IEmployeeRateListFilter } from '@account/classes/filters/employeeRate';

export interface IEmployeeRateListRequest {
  employeeUid: string;
  filter?: IEmployeeRateListFilter;
}