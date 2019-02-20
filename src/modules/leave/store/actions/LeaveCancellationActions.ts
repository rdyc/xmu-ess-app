import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ILeaveCancellationGetAllRequest,
  ILeaveCancellationGetByIdRequest,
  ILeaveCancellationPostRequest,
} from '@leave/classes/queries/cancellation';
import { ILeave, ILeaveDetail } from '@leave/classes/response';
import { action } from 'typesafe-actions';

export const enum LeaveCancellationAction {
  GET_ALL_REQUEST = '@@leaveCancellation/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@leaveCancellation/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@leaveCancellation/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@leaveCancellation/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@leaveCancellation/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@leaveCancellation/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@leaveCancellation/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@leaveCancellation/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@leaveCancellation/POST_REQUEST',
  POST_SUCCESS = '@@leaveCancellation/POST_SUCCESS',
  POST_ERROR = '@@leaveCancellation/POST_ERROR',
  POST_DISPOSE = '@@leaveCancellation/POST_DISPOSE',
}

// get all
export const leaveCancellationGetAllRequest = (request: ILeaveCancellationGetAllRequest) => action(LeaveCancellationAction.GET_ALL_REQUEST, request);
export const leaveCancellationGetAllSuccess = (response: IResponseCollection<ILeave>) => action(LeaveCancellationAction.GET_ALL_SUCCESS, response);
export const leaveCancellationGetAllError = (error: any) => action(LeaveCancellationAction.GET_ALL_ERROR, error);
export const leaveCancellationGetAllDispose = () => action(LeaveCancellationAction.GET_ALL_DISPOSE);

// get by id
export const leaveCancellationGetByIdRequest = (request: ILeaveCancellationGetByIdRequest) => action(LeaveCancellationAction.GET_BY_ID_REQUEST, request);
export const leaveCancellationGetByIdSuccess = (response: IResponseSingle<ILeaveDetail>) => action(LeaveCancellationAction.GET_BY_ID_SUCCESS, response);
export const leaveCancellationGetByIdError = (error: any) => action(LeaveCancellationAction.GET_BY_ID_ERROR, error);
export const leaveCancellationGetByIdDispose = () => action(LeaveCancellationAction.GET_BY_ID_DISPOSE);

// post
export const leaveCancellationPostRequest = (request: ILeaveCancellationPostRequest) => action(LeaveCancellationAction.POST_REQUEST, request);
export const leaveCancellationPostSuccess = (response: IResponseSingle<ILeave>) => action(LeaveCancellationAction.POST_SUCCESS, response);
export const leaveCancellationPostError = (error: any) => action(LeaveCancellationAction.POST_ERROR, error);
export const leaveCancellationPostDispose = () => action(LeaveCancellationAction.POST_DISPOSE);