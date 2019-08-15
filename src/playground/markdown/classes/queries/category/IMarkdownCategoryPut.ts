import { IBaseCommand } from '@generic/interfaces';
import { IMarkdownCategoryPutPayload } from '../../request';

export interface IMarkdownCategoryPut extends IBaseCommand<IMarkdownCategoryPutPayload> {
  uid: string;
}