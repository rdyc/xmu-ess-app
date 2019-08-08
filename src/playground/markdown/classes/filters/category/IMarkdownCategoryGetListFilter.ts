import { DirectionType } from '@generic/types';

export interface IMarkdownCategoryGetListFilter {
  orderBy?: string;
  direction?: DirectionType;
  isActive?: boolean;
}