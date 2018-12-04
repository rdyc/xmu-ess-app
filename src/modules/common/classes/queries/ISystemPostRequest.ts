import { ISystemPostPayload } from '@common/classes/request';
import { CommonCategoryType } from '@common/classes/types';
import { IBaseCommand } from '@generic/interfaces';

export interface ISystemPostRequest extends IBaseCommand<ISystemPostPayload> {
  category: CommonCategoryType;
}