import { IKPIAssignItemPostBulkPayload } from '.';

export interface IKPIAssignPostBulkPayload {
  year: number;
  templateUid: string;
  employees: IKPIAssignItemPostBulkPayload[];
}