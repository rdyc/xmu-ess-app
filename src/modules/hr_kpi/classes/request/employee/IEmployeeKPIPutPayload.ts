import { IEmployeeKPIPostItemPayload } from './IEmployeeKPIPostItemPayload';

export interface IEmployeeKPIPutPayload {
  templateUid: string;
  year: number;
  items: IEmployeeKPIPostItemPayload[];
}