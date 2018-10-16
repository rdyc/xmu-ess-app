import { ICompanyAccess } from '@generic/interfaces';

export interface ILeaveRequestGetByIdRequest extends ICompanyAccess {
  readonly leaveRequestUid: string | undefined;
}