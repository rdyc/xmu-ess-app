import { IEmployeeEducationListFilter } from '@account/classes/filters/employeeEducation';

export interface IEmployeeEducationListRequest {
  employeeUid: string;
  filter?: IEmployeeEducationListFilter;
}