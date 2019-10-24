import { IMarkdownCategoryGetAllFilter } from '../../filters/category/IMarkdownCategoryGetAllFilter';

export interface IMarkdownCategoryGetAll {
  readonly filter: IMarkdownCategoryGetAllFilter | undefined;
}