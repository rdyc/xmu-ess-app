import { IKPIAssign } from '@kpi/classes/response';
import { IEmployee } from '..';

export interface IEmployeeKPIAssign extends IEmployee {
  kpiAssigns?: IKPIAssign[];
  lastKPIAssign?: IKPIAssign;
}