import { IBaseCommand } from '@generic/interfaces';
import { IEmployeeKPIPostBulkPayload } from '@kpi/classes/request';

export interface IEmployeeKPIPostBulkRequest extends IBaseCommand<IEmployeeKPIPostBulkPayload> {
}