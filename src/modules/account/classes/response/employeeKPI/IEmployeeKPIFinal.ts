import { IEmployee } from '..';
import { IKPIFinal } from './IKPIFinal';

export interface IEmployeeKPIFinal extends IEmployee {
  kpiFinals?: IKPIFinal[];
  lastKPIFinal?: IKPIFinal;
}