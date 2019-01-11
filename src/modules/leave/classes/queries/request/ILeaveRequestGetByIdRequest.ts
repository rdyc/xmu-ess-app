import { ICompanyAccess } from '@generic/interfaces';

export interface ILeaveRequestGetByIdRequest extends ICompanyAccess {
  leaveUid?: string;
}