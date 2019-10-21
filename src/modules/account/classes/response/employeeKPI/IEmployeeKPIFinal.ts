import { IKPIFinal } from '@kpi/classes/response';
import { IEmployee } from '..';

export interface IEmployeeKPIFinal extends IEmployee {
  kpiFinals?: IKPIFinal[];
  lastKPIFinal?: IKPIFinal;
}