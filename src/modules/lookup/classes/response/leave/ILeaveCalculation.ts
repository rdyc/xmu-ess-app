import { IAccountEmployee } from '@account/classes';
import { IEmployeeLeave } from '@account/classes/response';

export interface ILeaveCalculation {
  employee: IAccountEmployee;
  employeeLeave?: IEmployeeLeave | null;
}