import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IProjectGetAllRequest, IProjectGetByIdRequest } from '@project/interfaces/queries';
import { IProject } from '@project/interfaces/response';
import { action } from 'typesafe-actions';

export const enum ProjectAction {
  GET_ALL_REQUEST = '@@project/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@project/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@project/GET_ALL_ERROR',

  GET_BY_ID_REQUEST = '@@project/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@project/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@project/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@project/GET_BY_ID_DISPOSE'
}
export const projectGetAllRequest = (request: IProjectGetAllRequest) => action(ProjectAction.GET_ALL_REQUEST, request);
export const projectGetAllSuccess = (response: IResponseCollection<IProject>) => action(ProjectAction.GET_ALL_SUCCESS, response);
export const projectGetAllError = (message: string) => action(ProjectAction.GET_ALL_ERROR, message);

export const projectGetByIdRequest = (request: IProjectGetByIdRequest) => action(ProjectAction.GET_BY_ID_REQUEST, request);
export const projectGetByIdSuccess = (response: IResponseSingle<IProject>) => action(ProjectAction.GET_BY_ID_SUCCESS, response);
export const projectGetByIdError = (message: string) => action(ProjectAction.GET_BY_ID_ERROR, message);
export const projectGetByIdDispose = () => action(ProjectAction.GET_BY_ID_DISPOSE);