import { IBaseCommand } from '@generic/interfaces';
import { IKPIEmployeePutFinalPayload } from '@kpi/classes/request';

export interface IKPIEmployeePutFinalRequest extends IBaseCommand<IKPIEmployeePutFinalPayload> {
  employeeUid: string;
  kpiUid: string;
}