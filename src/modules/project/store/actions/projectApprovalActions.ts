import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  IProjectApprovalGetAllRequest,
  IProjectApprovalGetByIdRequest,
  IProjectApprovalPostRequest,
} from '@project/classes/queries/approval';
import { IProject, IProjectDetail } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum ProjectApprovalAction {
  GET_ALL_REQUEST = '@@project/approval/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@project/approval/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@project/approval/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@project/approval/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@project/approval/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@project/approval/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@project/approval/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@project/approval/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@project/approval/POST_REQUEST',
  POST_SUCCESS = '@@project/approval/POST_SUCCESS',
  POST_ERROR = '@@project/approval/POST_ERROR',
  POST_DISPOSE = '@@project/approval/POST_DISPOSE'
}

// get all
export const projectApprovalGetAllRequest = (request: IProjectApprovalGetAllRequest) => action(ProjectApprovalAction.GET_ALL_REQUEST, request);
export const projectApprovalGetAllSuccess = (response: IResponseCollection<IProject>) => action(ProjectApprovalAction.GET_ALL_SUCCESS, response);
export const projectApprovalGetAllError = (message: string) => action(ProjectApprovalAction.GET_ALL_ERROR, message);
export const projectApprovalGetAllDispose = () => action(ProjectApprovalAction.GET_ALL_DISPOSE);

// get by id
export const projectApprovalGetByIdRequest = (request: IProjectApprovalGetByIdRequest) => action(ProjectApprovalAction.GET_BY_ID_REQUEST, request);
export const projectApprovalGetByIdSuccess = (response: IResponseSingle<IProjectDetail>) => action(ProjectApprovalAction.GET_BY_ID_SUCCESS, response);
export const projectApprovalGetByIdError = (message: string) => action(ProjectApprovalAction.GET_BY_ID_ERROR, message);
export const projectApprovalGetByIdDispose = () => action(ProjectApprovalAction.GET_BY_ID_DISPOSE);

// post
export const projectApprovalPostRequest = (request: IProjectApprovalPostRequest) => action(ProjectApprovalAction.POST_REQUEST, request);
export const projectApprovalPostSuccess = (response: boolean) => action(ProjectApprovalAction.POST_SUCCESS, response);
export const projectApprovalPostError = (message: string) => action(ProjectApprovalAction.POST_ERROR, message);
export const projectApprovalPostDispose = () => action(ProjectApprovalAction.POST_DISPOSE);