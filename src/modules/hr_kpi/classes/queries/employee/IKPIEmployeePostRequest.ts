import { IBaseCommand } from '@generic/interfaces';
import { IKPIEmployeePostPayload } from '@kpi/classes/request';

export interface IKPIEmployeePostRequest extends IBaseCommand<IKPIEmployeePostPayload> {
  companyUid: string;
  positionUid: string;
}