import { IEmployeeKPIFinalAllFilter } from '@account/classes/filters/employeeKPI';

export interface IEmployeeKPIFinalAllRequest {
  employeeUid: string;
  filter?: IEmployeeKPIFinalAllFilter;
}