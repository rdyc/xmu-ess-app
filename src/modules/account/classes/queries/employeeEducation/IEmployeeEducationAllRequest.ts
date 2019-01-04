import { IEmployeeEducationAllFilter } from '@account/classes/filters/employeeEducation';

export interface IEmployeeEducationAllRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeEducationAllFilter;
}