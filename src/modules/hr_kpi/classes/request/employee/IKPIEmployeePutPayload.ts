import { IKPIEmployeePostItemPayload } from './IKPIEmployeePostItemPayload';

export interface IKPIEmployeePutPayload {
  templateUid: string;
  year: number;
  period: number;
  items: IKPIEmployeePostItemPayload[];
}