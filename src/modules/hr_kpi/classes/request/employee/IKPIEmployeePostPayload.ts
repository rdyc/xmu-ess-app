import { IKPIEmployeeItemPostPayload } from '.';

export interface IKPIEmployeePostPayload {
  kpiAssignUid: string;
  period: number;
  items: IKPIEmployeeItemPostPayload[];
}