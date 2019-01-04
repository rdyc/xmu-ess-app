import { IEmployeeEducationListFilter } from '@account/classes/filters/employeeEducation';

export interface IEmployeeEducationListRequest {
  readonly employeeUid: string;
  readonly filter?: IEmployeeEducationListFilter | undefined;
}