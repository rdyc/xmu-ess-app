import { IKPIEmployeeItemPostPayload } from '.';

export interface IKPIEmployeePostPayload {
  kpiAssignUid: string;
  period: number;
  notes?: string;
  items: IKPIEmployeeItemPostPayload[];
}