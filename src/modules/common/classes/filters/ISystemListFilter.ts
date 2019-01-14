import { CommonCategoryField } from '@common/classes/types';
import { BaseDirectionField } from '@generic/types';
import { ModuleDefinition } from '@layout/helper/redirector';

export interface ISystemListFilter {
  companyUid?: string; 
  moduleType?: ModuleDefinition;
  orderBy?: CommonCategoryField;
  direction?: BaseDirectionField;
}