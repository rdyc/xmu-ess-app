import { CommonCategoryField } from '@common/classes/types';
import { DirectionType } from '@generic/types';
import { ModuleDefinitionType } from '@layout/types';

export interface ISystemListFilter {
  companyUid?: string; 
  parentCode?: string;
  moduleType?: ModuleDefinitionType;
  orderBy?: CommonCategoryField;
  direction?: DirectionType;
}