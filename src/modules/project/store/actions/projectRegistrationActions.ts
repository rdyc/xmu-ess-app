import { IResponseCollection, IResponseList, IResponseSingle } from '@generic/interfaces';
import {
  IProjectRegistrationGetAllRequest,
  IProjectRegistrationGetByIdRequest,
  IProjectRegistrationGetListRequest,
  IProjectRegistrationPostRequest,
  IProjectRegistrationPutRequest,
} from '@project/classes/queries/registration';
import { IProject, IProjectDetail, IProjectList } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum ProjectRegistrationAction {
  GET_ALL_REQUEST = '@@project/registration/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@project/registration/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@project/registration/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@project/registration/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@project/registration/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@project/registration/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@project/registration/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@project/registration/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@project/registration/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@project/registration/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@project/registration/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@project/registration/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@project/registration/POST_REQUEST',
  POST_SUCCESS = '@@project/registration/POST_SUCCESS',
  POST_ERROR = '@@project/registration/POST_ERROR',
  POST_DISPOSE = '@@project/registration/POST_DISPOSE',
  PUT_REQUEST = '@@project/registration/PUT_REQUEST',
  PUT_SUCCESS = '@@project/registration/PUT_SUCCESS',
  PUT_ERROR = '@@project/registration/PUT_ERROR',
  PUT_DISPOSE = '@@project/registration/PUT_DISPOSE',
}

// get all
export const projectRegistrationGetAllRequest = (request: IProjectRegistrationGetAllRequest) => action(ProjectRegistrationAction.GET_ALL_REQUEST, request);
export const projectRegistrationGetAllSuccess = (response: IResponseCollection<IProject>) => action(ProjectRegistrationAction.GET_ALL_SUCCESS, response);
export const projectRegistrationGetAllError = (message: string) => action(ProjectRegistrationAction.GET_ALL_ERROR, message);
export const projectRegistrationGetAllDispose = () => action(ProjectRegistrationAction.GET_ALL_DISPOSE);

// get list
export const projectRegistrationGetListRequest = (request: IProjectRegistrationGetListRequest) => action(ProjectRegistrationAction.GET_LIST_REQUEST, request);
export const projectRegistrationGetListSuccess = (response: IResponseList<IProjectList>) => action(ProjectRegistrationAction.GET_LIST_SUCCESS, response);
export const projectRegistrationGetListError = (message: string) => action(ProjectRegistrationAction.GET_LIST_ERROR, message);
export const projectRegistrationGetListDispose = () => action(ProjectRegistrationAction.GET_LIST_DISPOSE);

// get by id
export const projectRegistrationGetByIdRequest = (request: IProjectRegistrationGetByIdRequest) => action(ProjectRegistrationAction.GET_BY_ID_REQUEST, request);
export const projectRegistrationGetByIdSuccess = (response: IResponseSingle<IProjectDetail>) => action(ProjectRegistrationAction.GET_BY_ID_SUCCESS, response);
export const projectRegistrationGetByIdError = (message: string) => action(ProjectRegistrationAction.GET_BY_ID_ERROR, message);
export const projectRegistrationGetByIdDispose = () => action(ProjectRegistrationAction.GET_BY_ID_DISPOSE);

// post
export const projectRegistrationPostRequest = (request: IProjectRegistrationPostRequest) => action(ProjectRegistrationAction.POST_REQUEST, request);
export const projectRegistrationPostSuccess = (response: IResponseSingle<IProject>) => action(ProjectRegistrationAction.POST_SUCCESS, response);
export const projectRegistrationPostError = (message: string) => action(ProjectRegistrationAction.POST_ERROR, message);
export const projectRegistrationPostDispose = () => action(ProjectRegistrationAction.POST_DISPOSE);

// put
export const projectRegistrationPutRequest = (request: IProjectRegistrationPutRequest) => action(ProjectRegistrationAction.PUT_REQUEST, request);
export const projectRegistrationPutSuccess = (response: IResponseSingle<IProject>) => action(ProjectRegistrationAction.PUT_SUCCESS, response);
export const projectRegistrationPutError = (message: string) => action(ProjectRegistrationAction.PUT_ERROR, message);
export const projectRegistrationPutDispose = () => action(ProjectRegistrationAction.PUT_DISPOSE);