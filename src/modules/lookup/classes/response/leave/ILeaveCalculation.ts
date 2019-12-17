import { IEmployee } from '@account/classes/response';
import { IBaseChanges } from '@generic/interfaces';

export interface ILeaveCalculation {
  employee?: IEmployee;
  // employeeLeave?: IEmployeeLeave[];
  employeeUid: string;
  companyUid?: string;
  year: number;
  quota: number;
  remain: number;
  previousRemain: number;
  allowMinus: boolean;
  annualLeave: number;
  leaveTaken: number;
  changes?: IBaseChanges;
}