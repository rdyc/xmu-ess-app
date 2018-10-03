import { CommonCategoryType } from '@common/types';

export interface ISystemByIdRequest {
  category: CommonCategoryType;
  id: string;
}