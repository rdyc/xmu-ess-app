import { IEmployeeEducationAllFilter } from '@account/classes/filters/employeeEducation';

export interface IEmployeeEducationAllRequest {
  employeeUid: string;
  filter: IEmployeeEducationAllFilter;
}