import { IEmployeeKPIPostItemPayload } from './IEmployeeKPIPostItemPayload';

export interface IEmployeeKPIPostPayload {
  templateUid: string;
  year: number;
  items: IEmployeeKPIPostItemPayload[];
}