import { IKPIEmployeePostItemBulkPayload } from '.';

export interface IKPIEmployeePostBulkPayload {
  templateUid: string;
  period: number;
  year: number;
  employees: IKPIEmployeePostItemBulkPayload[];
}