import { ICompanyAccess } from '@generic/interfaces';

export interface IProjectGetByIdRequest extends ICompanyAccess {
  readonly projectUid: string | undefined;
}