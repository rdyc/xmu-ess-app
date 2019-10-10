import { IEmployee } from '@account/classes/response';
import { IKPIAssign } from '../assign';

export interface IEmployeeKPI extends IEmployee {
  lastAssign?: IKPIAssign;
  yearFinal?: number;
}