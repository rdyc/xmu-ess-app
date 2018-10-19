import { ICompanyAccess } from '@generic/interfaces';

export interface ILeaveRequestGetByIdRequest extends ICompanyAccess {
  readonly leaveUid: string | undefined;
}