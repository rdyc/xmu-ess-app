import { CommonCategoryType } from '@common/classes/types';

export interface ISystemByIdRequest {
  category: CommonCategoryType;
  id: string;
}