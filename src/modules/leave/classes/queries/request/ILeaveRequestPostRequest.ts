import { IBaseCommand } from '@generic/interfaces';
import { ILeaveRequestPostPayload } from '@leave/classes/request';

export interface ILeaveRequestPostRequest extends IBaseCommand<ILeaveRequestPostPayload> {
  companyUid: string;
  positionUid: string;
}