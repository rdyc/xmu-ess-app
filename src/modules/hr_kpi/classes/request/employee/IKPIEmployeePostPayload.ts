import { IKPIEmployeePostItemPayload } from './IKPIEmployeePostItemPayload';

export interface IKPIEmployeePostPayload {
  templateUid: string;
  year: number;
  period: number;
  items: IKPIEmployeePostItemPayload[];
}