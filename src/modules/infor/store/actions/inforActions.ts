import { IInforPostRequest } from 'modules/infor/classes/queries';
import { IInforResult } from 'modules/infor/classes/response';
import { action } from 'typesafe-actions';

export const enum InforAction {
  POST_REQUEST = '@@infor/POST_REQUEST',
  POST_SUCCESS = '@@infor/POST_SUCCESS',
  POST_ERROR = '@@infor/POST_ERROR',
  POST_DISPOSE = '@@infor/POST_DISPOSE'
}

// post
export const inforPostRequest = (request: IInforPostRequest) => action(InforAction.POST_REQUEST, request);
export const inforPostSuccess = (response: IInforResult) => action(InforAction.POST_SUCCESS, response);
export const inforPostError = (message: string) => action(InforAction.POST_ERROR, message);
export const inforPostDispose = () => action(InforAction.POST_DISPOSE);