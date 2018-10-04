import { ISystemListFilter } from '@common/classes/filters';
import { CommonCategoryType } from '@common/classes/types';

export interface ISystemListRequest {
  readonly category: CommonCategoryType;
  readonly filter?: ISystemListFilter | undefined;
}