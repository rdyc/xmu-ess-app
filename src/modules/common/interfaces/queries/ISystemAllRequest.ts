import { ISystemAllFilter } from '@common/interfaces/filters';
import { CommonCategoryType } from '@common/types';

export interface ISystemAllRequest {
  readonly category: CommonCategoryType;
  readonly filter?: ISystemAllFilter | undefined;
}