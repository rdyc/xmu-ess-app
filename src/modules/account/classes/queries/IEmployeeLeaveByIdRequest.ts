import { IBasePayload } from '@generic/interfaces';

export interface IEmployeeLeaveByIdRequest extends IBasePayload  {
  employeeUid: string;
  year: number;
  companyUid: string;
}