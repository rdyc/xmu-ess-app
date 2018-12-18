export interface IEmployeeLeave {
  employeeUid: string;
  companyUid: string;
  year: number;
  quota: number;
  remain: number;
  previousRemain: number;
  allowMinus: boolean;
  annualLeave: number;
  leaveTaken: number;
}