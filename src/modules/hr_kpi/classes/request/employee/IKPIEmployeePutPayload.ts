import { IKPIEmployeeItemPutPayload } from './IKPIEmployeeItemPutPayload';

export interface IKPIEmployeePutPayload {
  kpiAssignUid: string;
  period: number;
  revision?: string;
  items: IKPIEmployeeItemPutPayload[];
}