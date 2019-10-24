import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IMarkdownCategoryGetAll,
  IMarkdownCategoryGetById,
  IMarkdownCategoryGetList,
  IMarkdownCategoryPost,
  IMarkdownCategoryPut
} from '../queries';
import { IMarkdownCategory, IMarkdownCategoryDetail } from '../response';

export interface IMarkdownCategoryState {
  markdownCategoryGetAll: IQueryCollectionState<
    IMarkdownCategoryGetAll,
    IMarkdownCategory
  >;
  markdownCategoryGetList: IQueryCollectionState<
    IMarkdownCategoryGetList,
    IMarkdownCategory
  >;
  markdownCategoryGetById: IQuerySingleState<
    IMarkdownCategoryGetById,
    IMarkdownCategoryDetail
  >;
  markdownCategoryPost: IQuerySingleState<
    IMarkdownCategoryPost,
    IMarkdownCategory
  >;
  markdownCategoryPut: IQuerySingleState<
    IMarkdownCategoryPut,
    IMarkdownCategory
  >;
}
