import { IBaseCommand } from '@generic/interfaces';
import { IEmployeeKPIPutFinalPayload } from '@kpi/classes/request';

export interface IEmployeeKPIPutFinalRequest extends IBaseCommand<IEmployeeKPIPutFinalPayload> {
  employeeUid: string;
  kpiUid: string;
}