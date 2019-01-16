import { IEmployeeFamilyListFilter } from '@account/classes/filters/employeeFamily';

export interface IEmployeeFamilyListRequest {
  employeeUid: string;
  filter?: IEmployeeFamilyListFilter;
}