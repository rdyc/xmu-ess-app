import { IEmployee } from '@account/classes/response';

export interface IEmployeeKPI extends IEmployee {
  yearAssign?: number;
  yearFinal?: number;
}