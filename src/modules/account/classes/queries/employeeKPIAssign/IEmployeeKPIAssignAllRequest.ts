import { IEmployeeKPIAssignAllFilter } from '@account/classes/filters/employeeKPIAssign';

export interface IEmployeeKPIAssignAllRequest {
  employeeUid: string;
  filter?: IEmployeeKPIAssignAllFilter;
}