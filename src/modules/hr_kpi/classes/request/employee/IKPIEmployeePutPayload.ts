import { IKPIEmployeePostItemPayload } from './IKPIEmployeePostItemPayload';

export interface IKPIEmployeePutPayload {
  templateUid: string;
  year: number;
  period: number;
  isFinal: boolean;
  revision?: string;
  items: IKPIEmployeePostItemPayload[];
}