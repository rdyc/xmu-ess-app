import { IEmployeeFamilyAllFilter } from '@account/classes/filters/employeeFamily';

export interface IEmployeeFamilyAllRequest {
  employeeUid: string;
  filter: IEmployeeFamilyAllFilter;
}