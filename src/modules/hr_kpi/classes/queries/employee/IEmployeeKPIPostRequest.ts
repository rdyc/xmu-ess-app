import { IBaseCommand } from '@generic/interfaces';
import { IEmployeeKPIPostPayload } from '@kpi/classes/request';

export interface IEmployeeKPIPostRequest extends IBaseCommand<IEmployeeKPIPostPayload> {
  employeeUid: string;
}