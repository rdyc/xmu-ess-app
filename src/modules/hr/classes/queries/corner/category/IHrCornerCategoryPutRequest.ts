import { IBaseCommand } from '@generic/interfaces';
import { IHrCornerCategoryPutPayload } from '@hr/classes/request';

export interface IHrCornerCategoryPutRequest extends IBaseCommand<IHrCornerCategoryPutPayload> {
  categoryUid: string;
}