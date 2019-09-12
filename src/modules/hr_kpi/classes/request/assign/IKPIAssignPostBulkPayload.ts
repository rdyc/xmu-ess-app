import { IKPIAssignItemPostBulkPayload } from '.';

export interface IKPIAssignPostBulkPayload {
  templateUid: string;
  employees: IKPIAssignItemPostBulkPayload[];
}