import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeLeave {
  employeeUid: string;
  year: number;
  quota: number;
  remain: number;
  previousRemain: number;
  allowMinus: boolean | null;
  annualLeave: number | null;
  leaveTaken: number | null;
  changes: IBaseChanges | null;
}