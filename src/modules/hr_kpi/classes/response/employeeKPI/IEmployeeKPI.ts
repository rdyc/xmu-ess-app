import { IEmployee } from '@account/classes/response';

export interface IEmployeeKPI extends IEmployee {
  year?: number;
  period?: number;
}