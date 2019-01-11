import { CommonCategoryField } from '@common/classes/types';
import { BaseDirectionField } from '@generic/types';

export interface ISystemListFilter {
  companyUid?: string; 
  orderBy?: CommonCategoryField;
  direction?: BaseDirectionField;
}