import { IBaseCommand } from '@generic/interfaces';
import { ILeaveRequestPutPayload } from '@leave/classes/request';

export interface ILeaveRequestPutRequest extends IBaseCommand<ILeaveRequestPutPayload> {
  companyUid: string;
  positionUid: string;
  leaveUid: string;
}