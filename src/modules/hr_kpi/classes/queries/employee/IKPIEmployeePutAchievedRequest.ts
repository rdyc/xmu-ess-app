import { IBaseCommand } from '@generic/interfaces';
import { IKPIEmployeePutAchievedPayload } from '@kpi/classes/request';

export interface IKPIEmployeePutAchievedRequest extends IBaseCommand<IKPIEmployeePutAchievedPayload> {
  employeeUid: string;
  kpiUid: string;
}