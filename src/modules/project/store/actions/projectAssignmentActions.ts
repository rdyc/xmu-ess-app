import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  IProjectAssignmentGetAllRequest,
  IProjectAssignmentGetByIdRequest,
  IProjectAssignmentGetListRequest,
  IProjectAssignmentPatchRequest,
} from '@project/classes/queries/assignment';
import { IProjectAssignment, IProjectAssignmentDetail, IProjectAssignmentList } from '@project/classes/response';
import { action } from 'typesafe-actions';

export const enum ProjectAssignmentAction {
  GET_ALL_REQUEST = '@@project/assignment/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@project/assignment/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@project/assignment/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@project/assignment/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@project/assignment/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@project/assignment/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@project/assignment/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@project/assignment/GET_BY_ID_DISPOSE',
  GET_LIST_REQUEST = '@@project/assignment/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@project/assignment/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@project/assignment/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@project/assignment/GET_LIST_DISPOSE',
  PATCH_REQUEST = '@@project/assignment/PATCH_REQUEST',
  PATCH_SUCCESS = '@@project/assignment/PATCH_SUCCESS',
  PATCH_ERROR = '@@project/assignment/PATCH_ERROR',
  PATCH_DISPOSE = '@@project/assignment/PATCH_DISPOSE'
}

// get all
export const projectAssignmentGetAllRequest = (request: IProjectAssignmentGetAllRequest) => action(ProjectAssignmentAction.GET_ALL_REQUEST, request);
export const projectAssignmentGetAllSuccess = (response: IResponseCollection<IProjectAssignment>) => action(ProjectAssignmentAction.GET_ALL_SUCCESS, response);
export const projectAssignmentGetAllError = (message: string) => action(ProjectAssignmentAction.GET_ALL_ERROR, message);
export const projectAssignmentGetAllDispose = () => action(ProjectAssignmentAction.GET_ALL_DISPOSE);

// get by id
export const projectAssignmentGetByIdRequest = (request: IProjectAssignmentGetByIdRequest) => action(ProjectAssignmentAction.GET_BY_ID_REQUEST, request);
export const projectAssignmentGetByIdSuccess = (response: IResponseSingle<IProjectAssignmentDetail>) => action(ProjectAssignmentAction.GET_BY_ID_SUCCESS, response);
export const projectAssignmentGetByIdError = (message: string) => action(ProjectAssignmentAction.GET_BY_ID_ERROR, message);
export const projectAssignmentGetByIdDispose = () => action(ProjectAssignmentAction.GET_BY_ID_DISPOSE);

// get list
export const projectAssignmentGetListRequest = (request: IProjectAssignmentGetListRequest) => action(ProjectAssignmentAction.GET_LIST_REQUEST, request);
export const projectAssignmentGetListSuccess = (response: IResponseSingle<IProjectAssignmentList>) => action(ProjectAssignmentAction.GET_LIST_SUCCESS, response);
export const projectAssignmentGetListError = (message: string) => action(ProjectAssignmentAction.GET_LIST_ERROR, message);
export const projectAssignmentGetListDispose = () => action(ProjectAssignmentAction.GET_LIST_DISPOSE);

// post
export const projectAssignmentPatchRequest = (request: IProjectAssignmentPatchRequest) => action(ProjectAssignmentAction.PATCH_REQUEST, request);
export const projectAssignmentPatchSuccess = (response: undefined) => action(ProjectAssignmentAction.PATCH_SUCCESS, response);
export const projectAssignmentPatchError = (message: string) => action(ProjectAssignmentAction.PATCH_ERROR, message);
export const projectAssignmentPatchDispose = () => action(ProjectAssignmentAction.PATCH_DISPOSE);