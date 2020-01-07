import { IMarkdownGetAllFilter } from '../filters';

export interface IMarkdownGetAll {
  readonly filter: IMarkdownGetAllFilter | undefined;
}