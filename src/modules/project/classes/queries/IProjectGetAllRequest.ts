import { ICompanyAccess } from '@generic/interfaces';
import { IProjectGetAllFilter } from '@project/classes/filters';

export interface IProjectGetAllRequest extends ICompanyAccess {
  readonly filter: IProjectGetAllFilter | undefined;
}