import { CommonCategoryField } from '@common/classes/types';
import { BaseDirectionField } from '@generic/types';

export interface ISystemListFilter {
  companyUid?: string | undefined; 
  orderBy?: CommonCategoryField | undefined;
  direction?: BaseDirectionField | undefined;
}