import { ICompanyAccess } from '@generic/interfaces';
import { IProjectGetListFilter } from '@project/classes/filters';

export interface IProjectGetListRequest extends ICompanyAccess {
  readonly filter: IProjectGetListFilter | undefined;
}