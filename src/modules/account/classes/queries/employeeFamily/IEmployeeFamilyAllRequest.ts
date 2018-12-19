import { IEmployeeFamilyAllFilter } from '@account/classes/filters/employeeFamily';

export interface IEmployeeFamilyAllRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeFamilyAllFilter;
}