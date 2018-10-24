import { ICompanyAccess } from '@generic/interfaces';

export interface ILeaveApprovalGetByIdRequest extends ICompanyAccess {
  readonly leaveUid: string | undefined;
}