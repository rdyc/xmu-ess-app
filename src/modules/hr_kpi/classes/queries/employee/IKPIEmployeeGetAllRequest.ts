import { IKPIEmployeeGetAllFilter } from '@kpi/classes/filter/employee';

export interface IKPIEmployeeGetAllRequest {
  readonly employeeUid: string;
  filter?: IKPIEmployeeGetAllFilter;
}