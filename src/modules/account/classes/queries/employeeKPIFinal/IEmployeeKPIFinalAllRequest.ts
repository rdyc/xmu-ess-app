import { IEmployeeKPIFinalAllFilter } from '@account/classes/filters/employeeKPIFinal';

export interface IEmployeeKPIFinalAllRequest {
  employeeUid: string;
  filter?: IEmployeeKPIFinalAllFilter;
}