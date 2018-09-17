import { ICompanyAccess } from '@generic/interfaces';
import { IProjectRegistrationAllFilter } from '@project/interfaces/filters';

export interface IProjectRegistrationAllRequest extends ICompanyAccess {
  readonly filter: IProjectRegistrationAllFilter | undefined;
}