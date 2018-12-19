import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeLeave {
  employeeUid: string;
  companyUid: string | null;
  year: number;
  quota: number;
  remain: number;
  previousRemain: number;
  allowMinus: boolean | null;
  annualLeave: number;
  leaveTaken: number;
  changes: IBaseChanges | null;
}