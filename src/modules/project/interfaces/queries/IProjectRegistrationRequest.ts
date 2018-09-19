import { ICompanyAccess } from '@generic/interfaces';

export interface IProjectRegistrationRequest extends ICompanyAccess {
  readonly projectUid: string | undefined;
}