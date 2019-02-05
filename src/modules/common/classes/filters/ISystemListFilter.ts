import { CommonCategoryField } from '@common/classes/types';
import { DirectionType } from '@generic/types';
import { ModuleDefinition } from '@layout/helper/redirector';

export interface ISystemListFilter {
  companyUid?: string; 
  parentCode?: string;
  moduleType?: ModuleDefinition;
  orderBy?: CommonCategoryField;
  direction?: DirectionType;
}