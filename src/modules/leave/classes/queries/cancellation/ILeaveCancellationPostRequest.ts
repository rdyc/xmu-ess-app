import { IBaseCommand, ICompanyAccess } from '@generic/interfaces';
import { ILeaveCancellationPostPayload } from '@leave/classes/request';

export interface ILeaveCancellationPostRequest extends ICompanyAccess, IBaseCommand<ILeaveCancellationPostPayload> {
  leaveUid: string;
}