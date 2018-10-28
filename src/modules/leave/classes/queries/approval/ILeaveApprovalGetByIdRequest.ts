import { ICompanyAccess } from '@generic/interfaces';

export interface ILeaveApprovalGetByIdRequest extends ICompanyAccess {
  leaveUid: string | undefined;
}