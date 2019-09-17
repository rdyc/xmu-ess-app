import { IBaseCommand } from '@generic/interfaces';
import { IKPIApprovalPostPayload } from '@kpi/classes/request';

export interface IKPIApprovalPostRequest extends IBaseCommand<IKPIApprovalPostPayload> {
  kpiUid: string;
}