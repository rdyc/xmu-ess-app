import { IBaseCommand } from '@generic/interfaces';
import { IEmployeeKPIPutPayload } from '@kpi/classes/request';

export interface IEmployeeKPIPutRequest extends IBaseCommand<IEmployeeKPIPutPayload> {
  employeeUid: string;
  kpiUid: string;
}