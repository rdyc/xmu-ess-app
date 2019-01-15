import { ISystemListFilter } from '@common/classes/filters';
import { CommonCategoryType } from '@common/classes/types';

export interface ISystemListRequest {
  category: CommonCategoryType;
  filter?: ISystemListFilter;
}