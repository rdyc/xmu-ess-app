import { IEmployeeKPIGetAllFilter } from '@kpi/classes/filter/employee';

export interface IEmployeeKPIGetAllRequest {
  readonly employeeUid: string;
  filter?: IEmployeeKPIGetAllFilter;
}