import { IBaseCommand } from '@generic/interfaces';
import { IKPIAssignPutPayload } from '@kpi/classes/request';

export interface IKPIAssignPutRequest extends IBaseCommand<IKPIAssignPutPayload> {
  employeeUid: string;
  kpiAssignUid: string;
}