import { CommonCategoryField } from '@common/types/CommonCategoryField';
import { BaseDirectionField } from '@generic/types';

export interface ISystemListFilter {
  companyUid?: string | undefined; 
  orderBy?: CommonCategoryField | undefined;
  direction?: BaseDirectionField | undefined;
}