import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  IProjectAcceptanceGetAllRequest,
  IProjectAcceptanceGetByIdRequest,
  IProjectAcceptancePostRequest,
} from '@project/classes/queries/acceptance';
import { IProjectAssignmentDetail, IProjectAssignmentDetailItem } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum ProjectAcceptanceAction {
  GET_ALL_REQUEST = '@@project/acceptance/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@project/acceptance/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@project/acceptance/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@project/acceptance/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@project/acceptance/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@project/acceptance/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@project/acceptance/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@project/acceptance/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@project/acceptance/POST_REQUEST',
  POST_SUCCESS = '@@project/acceptance/POST_SUCCESS',
  POST_ERROR = '@@project/acceptance/POST_ERROR',
  POST_DISPOSE = '@@project/acceptance/POST_DISPOSE',
}

// get all
export const projectAcceptanceGetAllRequest = (request: IProjectAcceptanceGetAllRequest) => action(ProjectAcceptanceAction.GET_ALL_REQUEST, request);
export const projectAcceptanceGetAllSuccess = (response: IResponseCollection<IProjectAssignmentDetail>) => action(ProjectAcceptanceAction.GET_ALL_SUCCESS, response);
export const projectAcceptanceGetAllError = (error: any) => action(ProjectAcceptanceAction.GET_ALL_ERROR, error);
export const projectAcceptanceGetAllDispose = () => action(ProjectAcceptanceAction.GET_ALL_DISPOSE);

// get by id
export const projectAcceptanceGetByIdRequest = (request: IProjectAcceptanceGetByIdRequest) => action(ProjectAcceptanceAction.GET_BY_ID_REQUEST, request);
export const projectAcceptanceGetByIdSuccess = (response: IResponseSingle<IProjectAssignmentDetailItem>) => action(ProjectAcceptanceAction.GET_BY_ID_SUCCESS, response);
export const projectAcceptanceGetByIdError = (error: any) => action(ProjectAcceptanceAction.GET_BY_ID_ERROR, error);
export const projectAcceptanceGetByIdDispose = () => action(ProjectAcceptanceAction.GET_BY_ID_DISPOSE);

// post
export const projectAcceptancePostRequest = (request: IProjectAcceptancePostRequest) => action(ProjectAcceptanceAction.POST_REQUEST, request);
export const projectAcceptancePostSuccess = (response: boolean) => action(ProjectAcceptanceAction.POST_SUCCESS, response);
export const projectAcceptancePostError = (error: string) => action(ProjectAcceptanceAction.POST_ERROR, error);
export const projectAcceptancePostDispose = () => action(ProjectAcceptanceAction.POST_DISPOSE);