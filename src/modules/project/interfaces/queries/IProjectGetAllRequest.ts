import { ICompanyAccess } from '@generic/interfaces';
import { IProjectGetAllFilter } from '@project/interfaces/filters';

export interface IProjectGetAllRequest extends ICompanyAccess {
  readonly filter: IProjectGetAllFilter | undefined;
}