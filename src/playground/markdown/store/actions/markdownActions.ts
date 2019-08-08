import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IMarkdownGetAll, IMarkdownGetById, IMarkdownPost, IMarkdownPut } from 'playground/markdown/classes/queries';
import { IMarkdown, IMarkdownDetail } from 'playground/markdown/classes/response';
import { action } from 'typesafe-actions';

export const enum MarkdownAction {
  GET_ALL_REQUEST = '@@markdown/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@markdown/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@markdown/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@markdown/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@markdown/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@markdown/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@markdown/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@markdown/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@markdown/POST_REQUEST',
  POST_SUCCESS = '@@markdown/POST_SUCCESS',
  POST_ERROR = '@@markdown/POST_ERROR',
  POST_DISPOSE = '@@markdown/POST_DISPOSE',
  PUT_REQUEST = '@@markdown/PUT_REQUEST',
  PUT_SUCCESS = '@@markdown/PUT_SUCCESS',
  PUT_ERROR = '@@markdown/PUT_ERROR',
  PUT_DISPOSE = '@@markdown/PUT_DISPOSE'
}

// get all
export const markdownGetAllRequest = (request: IMarkdownGetAll) => action(MarkdownAction.GET_ALL_REQUEST, request);
export const markdownGetAllSuccess = (response: IResponseCollection<IMarkdown>) => action(MarkdownAction.GET_ALL_SUCCESS, response);
export const markdownGetAllError = (error: any) => action(MarkdownAction.GET_ALL_ERROR, error);
export const markdownGetAllDispose = () => action(MarkdownAction.GET_ALL_DISPOSE);

// get by id
export const markdownGetByIdRequest = (request: IMarkdownGetById) => action(MarkdownAction.GET_BY_ID_REQUEST, request);
export const markdownGetByIdSuccess = (response: IResponseSingle<IMarkdownDetail>) => action(MarkdownAction.GET_BY_ID_SUCCESS, response);
export const markdownGetByIdError = (error: any) => action(MarkdownAction.GET_BY_ID_ERROR, error);
export const markdownGetByIdDispose = () => action(MarkdownAction.GET_BY_ID_DISPOSE);

// post
export const markdownPostRequest = (request: IMarkdownPost) => action(MarkdownAction.POST_REQUEST, request);
export const markdownPostSuccess = (response: IResponseSingle<IMarkdown>) => action(MarkdownAction.POST_SUCCESS, response);
export const markdownPostError = (error: string) => action(MarkdownAction.POST_ERROR, error);
export const markdownPostDispose = () => action(MarkdownAction.POST_DISPOSE);

// put
export const markdownPutRequest = (request: IMarkdownPut) => action(MarkdownAction.PUT_REQUEST, request);
export const markdownPutSuccess = (response: IResponseSingle<IMarkdown>) => action(MarkdownAction.PUT_SUCCESS, response);
export const markdownPutError = (error: string) => action(MarkdownAction.PUT_ERROR, error);
export const markdownPutDispose = () => action(MarkdownAction.PUT_DISPOSE);
