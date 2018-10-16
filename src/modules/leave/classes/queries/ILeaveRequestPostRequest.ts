import { ILeaveRequestPostPayload } from '@leave/classes/request';
import { IBaseCommand } from '@generic/interfaces';

export interface ILeaveRequestPostRequest extends IBaseCommand<ILeaveRequestPostPayload> {
  companyUid: string;
  positionUid: string;
}