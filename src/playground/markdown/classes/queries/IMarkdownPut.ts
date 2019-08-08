import { IBaseCommand } from '@generic/interfaces';
import { IMarkdownPutPayload } from '../request';

export interface IMarkdownPut extends IBaseCommand<IMarkdownPutPayload> {
  markdownUid: string;
}