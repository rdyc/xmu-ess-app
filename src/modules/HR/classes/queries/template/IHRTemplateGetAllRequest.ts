import { ICompanyAccess } from '@generic/interfaces';
import { IHRTemplateGetAllFilter } from '@hr/classes/filter';

export interface IHRTemplateGetAllRequest extends ICompanyAccess {
  filter?: IHRTemplateGetAllFilter;
}