import { IBaseCommand } from '@generic/interfaces';
import { IKPIEmployeePutPayload } from '@kpi/classes/request';

export interface IKPIEmployeePutRequest extends IBaseCommand<IKPIEmployeePutPayload> {
  employeeUid: string;
  kpiUid: string;
}