import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IMarkdownCategoryGetAll, IMarkdownCategoryGetById, IMarkdownCategoryGetList, IMarkdownCategoryPost, IMarkdownCategoryPut } from 'playground/markdown/classes/queries';
import { IMarkdownCategory, IMarkdownCategoryDetail } from 'playground/markdown/classes/response';
import { action } from 'typesafe-actions';

export const enum MarkdownCategoryAction {
  GET_ALL_REQUEST = '@@markdown/category/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@markdown/category/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@markdown/category/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@markdown/category/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@markdown/category/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@markdown/category/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@markdown/category/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@markdown/category/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@markdown/category/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@markdown/category/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@markdown/category/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@markdown/category/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@markdown/category/POST_REQUEST',
  POST_SUCCESS = '@@markdown/category/POST_SUCCESS',
  POST_ERROR = '@@markdown/category/POST_ERROR',
  POST_DISPOSE = '@@markdown/category/POST_DISPOSE',
  PUT_REQUEST = '@@markdown/category/PUT_REQUEST',
  PUT_SUCCESS = '@@markdown/category/PUT_SUCCESS',
  PUT_ERROR = '@@markdown/category/PUT_ERROR',
  PUT_DISPOSE = '@@markdown/category/PUT_DISPOSE'
}

// get all
export const markdownCategoryGetAllRequest = (request: IMarkdownCategoryGetAll) => action(MarkdownCategoryAction.GET_ALL_REQUEST, request);
export const markdownCategoryGetAllSuccess = (response: IResponseCollection<IMarkdownCategory>) => action(MarkdownCategoryAction.GET_ALL_SUCCESS, response);
export const markdownCategoryGetAllError = (error: any) => action(MarkdownCategoryAction.GET_ALL_ERROR, error);
export const markdownCategoryGetAllDispose = () => action(MarkdownCategoryAction.GET_ALL_DISPOSE);

// get list
export const markdownCategoryGetListRequest = (request: IMarkdownCategoryGetList) => action(MarkdownCategoryAction.GET_LIST_REQUEST, request);
export const markdownCategoryGetListSuccess = (response: IResponseCollection<IMarkdownCategory>) => action(MarkdownCategoryAction.GET_LIST_SUCCESS, response);
export const markdownCategoryGetListError = (error: any) => action(MarkdownCategoryAction.GET_LIST_ERROR, error);
export const markdownCategoryGetListDispose = () => action(MarkdownCategoryAction.GET_LIST_DISPOSE);

// get by id
export const markdownCategoryGetByIdRequest = (request: IMarkdownCategoryGetById) => action(MarkdownCategoryAction.GET_BY_ID_REQUEST, request);
export const markdownCategoryGetByIdSuccess = (response: IResponseSingle<IMarkdownCategoryDetail>) => action(MarkdownCategoryAction.GET_BY_ID_SUCCESS, response);
export const markdownCategoryGetByIdError = (error: any) => action(MarkdownCategoryAction.GET_BY_ID_ERROR, error);
export const markdownCategoryGetByIdDispose = () => action(MarkdownCategoryAction.GET_BY_ID_DISPOSE);

// post
export const markdownCategoryPostRequest = (request: IMarkdownCategoryPost) => action(MarkdownCategoryAction.POST_REQUEST, request);
export const markdownCategoryPostSuccess = (response: IResponseSingle<IMarkdownCategory>) => action(MarkdownCategoryAction.POST_SUCCESS, response);
export const markdownCategoryPostError = (error: string) => action(MarkdownCategoryAction.POST_ERROR, error);
export const markdownCategoryPostDispose = () => action(MarkdownCategoryAction.POST_DISPOSE);

// put
export const markdownCategoryPutRequest = (request: IMarkdownCategoryPut) => action(MarkdownCategoryAction.PUT_REQUEST, request);
export const markdownCategoryPutSuccess = (response: IResponseSingle<IMarkdownCategory>) => action(MarkdownCategoryAction.PUT_SUCCESS, response);
export const markdownCategoryPutError = (error: string) => action(MarkdownCategoryAction.PUT_ERROR, error);
export const markdownCategoryPutDispose = () => action(MarkdownCategoryAction.PUT_DISPOSE);
