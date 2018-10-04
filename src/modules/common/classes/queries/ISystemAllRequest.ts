import { ISystemAllFilter } from '@common/classes/filters';
import { CommonCategoryType } from '@common/classes/types';

export interface ISystemAllRequest {
  readonly category: CommonCategoryType;
  readonly filter?: ISystemAllFilter | undefined;
}