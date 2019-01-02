import { IEmployeeFamilyListFilter } from '@account/classes/filters/employeeFamily';

export interface IEmployeeFamilyListRequest {
  readonly employeeUid: string;
  readonly filter: IEmployeeFamilyListFilter;
}