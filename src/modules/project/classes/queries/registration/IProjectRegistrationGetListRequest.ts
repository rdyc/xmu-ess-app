import { ICompanyAccess } from '@generic/interfaces';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';

export interface IProjectRegistrationGetListRequest extends ICompanyAccess {
  readonly filter: IProjectRegistrationGetListFilter | undefined;
}