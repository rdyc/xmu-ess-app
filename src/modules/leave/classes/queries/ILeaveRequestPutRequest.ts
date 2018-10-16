import { ILeaveRequestPutPayload } from '@leave/classes/request';
import { IBaseCommand } from '@generic/interfaces';

export interface ILeaveRequestPutRequest extends IBaseCommand<ILeaveRequestPutPayload> {
  companyUid: string;
  positionUid: string;
  leaveRequestUid: string;
}