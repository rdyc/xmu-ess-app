import { IKPIEmployeeItemPutPayload } from './IKPIEmployeeItemPutPayload';

export interface IKPIEmployeePutPayload {
  revision?: string;
  notes?: string;
  items: IKPIEmployeeItemPutPayload[];
}