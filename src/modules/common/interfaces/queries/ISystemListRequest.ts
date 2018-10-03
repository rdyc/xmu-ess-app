import { ISystemListFilter } from '@common/interfaces/filters';
import { CommonCategoryType } from '@common/types';

export interface ISystemListRequest {
  readonly category: CommonCategoryType;
  readonly filter?: ISystemListFilter | undefined;
}