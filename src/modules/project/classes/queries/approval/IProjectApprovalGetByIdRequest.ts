import { ICompanyAccess } from '@generic/interfaces';

export interface IProjectApprovalGetByIdRequest extends ICompanyAccess {
  projectUid: string;
}