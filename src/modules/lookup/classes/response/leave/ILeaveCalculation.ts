import { IEmployee, IEmployeeLeave } from '@account/classes/response';

export interface ILeaveCalculation {
  employee?: IEmployee;
  employeeLeave?: IEmployeeLeave[];
}