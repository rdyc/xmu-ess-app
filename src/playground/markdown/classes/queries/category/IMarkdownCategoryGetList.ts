import { IMarkdownCategoryGetListFilter } from '../../filters/category/IMarkdownCategoryGetListFilter';

export interface IMarkdownCategoryGetList {
  readonly filter: IMarkdownCategoryGetListFilter | undefined;
}