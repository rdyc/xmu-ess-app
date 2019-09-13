import { IBaseCommand } from '@generic/interfaces';
import { IKPIAssignPostBulkPayload } from '@kpi/classes/request';

export interface IKPIAssignPostBulkRequest extends IBaseCommand<IKPIAssignPostBulkPayload> {
  year: number;
}