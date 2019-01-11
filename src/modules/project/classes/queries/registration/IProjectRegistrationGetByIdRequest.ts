import { ICompanyAccess } from '@generic/interfaces';

export interface IProjectRegistrationGetByIdRequest extends ICompanyAccess {
  projectUid?: string;
}