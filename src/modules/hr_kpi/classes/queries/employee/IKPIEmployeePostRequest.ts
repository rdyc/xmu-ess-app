import { IBaseCommand } from '@generic/interfaces';
import { IKPIEmployeePostPayload } from '@kpi/classes/request';

export interface IKPIEmployeePostRequest extends IBaseCommand<IKPIEmployeePostPayload> {
  employeeUid: string;
}