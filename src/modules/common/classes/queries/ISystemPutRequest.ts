import { ISystemPutPayload } from '@common/classes/request';
import { CommonCategoryType } from '@common/classes/types';
import { IBaseCommand } from '@generic/interfaces';

export interface ISystemPutRequest extends IBaseCommand<ISystemPutPayload> {
  id: string;
  category: CommonCategoryType;
}