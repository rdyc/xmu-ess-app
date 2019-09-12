import { IBaseCommand } from '@generic/interfaces';
import { IKPIEmployeePutPayload } from '@kpi/classes/request';

export interface IKPIEmployeePutRequest extends IBaseCommand<IKPIEmployeePutPayload> {
  companyUid: string;
  positionUid: string;
  kpiUid: string;
}