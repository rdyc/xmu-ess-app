import { ICompanyAccess } from '@generic/interfaces';

export interface IProjectRegistrationGetByIdRequest extends ICompanyAccess {
  readonly projectUid: string | undefined;
}