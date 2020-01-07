import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  IMarkdownCategoryGetAll,
  IMarkdownCategoryGetById,
  IMarkdownCategoryGetList,
  IMarkdownCategoryPost,
  IMarkdownCategoryPut,
  IMarkdownGetAll,
  IMarkdownGetById,
  IMarkdownPost,
  IMarkdownPut
} from '../queries';
import {
  IMarkdown,
  IMarkdownCategory,
  IMarkdownCategoryDetail,
  IMarkdownDetail
} from '../response';

export interface IMarkdownState {
  markdownGetAll: IQueryCollectionState<IMarkdownGetAll, IMarkdown>;
  markdownGetById: IQuerySingleState<IMarkdownGetById, IMarkdownDetail>;
  markdownPost: IQuerySingleState<IMarkdownPost, IMarkdown>;
  markdownPut: IQuerySingleState<IMarkdownPut, IMarkdown>;
  markdownCategoryGetAll: IQueryCollectionState<IMarkdownCategoryGetAll, IMarkdownCategory>;
  markdownCategoryGetList: IQueryCollectionState<IMarkdownCategoryGetList, IMarkdownCategory>;
  markdownCategoryGetById: IQuerySingleState<IMarkdownCategoryGetById, IMarkdownCategoryDetail>;
  markdownCategoryPost: IQuerySingleState<IMarkdownCategoryPost, IMarkdownCategory>;
  markdownCategoryPut: IQuerySingleState<IMarkdownCategoryPut, IMarkdownCategory>;
}
