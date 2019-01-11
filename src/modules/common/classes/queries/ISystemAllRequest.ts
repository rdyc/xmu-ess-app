import { ISystemAllFilter } from '@common/classes/filters';
import { CommonCategoryType } from '@common/classes/types';

export interface ISystemAllRequest {
  category: CommonCategoryType;
  filter?: ISystemAllFilter;
}