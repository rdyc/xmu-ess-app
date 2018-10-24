import { IBaseCommand } from '@generic/interfaces';
import { ILeaveApprovalPostPayload } from '@leave/classes/request';

export interface ILeaveApprovalPostRequest extends IBaseCommand<ILeaveApprovalPostPayload> {
  companyUid: string;
  positionUid: string;
  leaveUid: string;
}