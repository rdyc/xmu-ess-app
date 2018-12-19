import { ICompanyAccess } from '@generic/interfaces';
import { IProjectRegistrationGetAllFilter } from '@project/classes/filters/registration';

export interface IProjectRegistrationGetAllRequest extends ICompanyAccess {
  filter?: IProjectRegistrationGetAllFilter;
}