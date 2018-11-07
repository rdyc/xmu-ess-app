import { ICompanyAccess } from '@generic/interfaces';

export interface ILeaveCancellationGetByIdRequest extends ICompanyAccess {
  leaveUid: string;
}