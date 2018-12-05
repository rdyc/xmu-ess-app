import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ILeaveGetEndQuery,
  ILeaveRequestGetAllRequest,
  ILeaveRequestGetByIdRequest,
  ILeaveRequestPostRequest,
  ILeaveRequestPutRequest,
} from '@leave/classes/queries/request';
import { ILeave, ILeaveDetail, ILeaveGetEnd } from '@leave/classes/response';
import { action } from 'typesafe-actions';

export const enum LeaveRequestAction {
  GET_ALL_REQUEST = '@@leaveRequest/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@leaveRequest/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@leaveRequest/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@leaveRequest/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@leaveRequest/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@leaveRequest/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@leaveRequest/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@leaveRequest/GET_BY_ID_DISPOSE',
  FETCH_REQUEST = '@@leaveRequest/FETCH_REQUEST',
  FETCH_SUCCESS = '@@leaveRequest/FETCH_SUCCESS',
  FETCH_ERROR = '@@leaveRequest/FETCH_ERROR',
  FETCH_DISPOSE = '@@leaveRequest/FETCH_DISPOSE',
  POST_REQUEST = '@@leaveRequest/POST_REQUEST',
  POST_SUCCESS = '@@leaveRequest/POST_SUCCESS',
  POST_ERROR = '@@leaveRequest/POST_ERROR',
  POST_DISPOSE = '@@leaveRequest/POST_DISPOSE',
  PUT_REQUEST = '@@leaveRequest/PUT_REQUEST',
  PUT_SUCCESS = '@@leaveRequest/PUT_SUCCESS',
  PUT_ERROR = '@@leaveRequest/PUT_ERROR',
  PUT_DISPOSE = '@@leaveRequest/PUT_DISPOSE',
}

// get all
export const leaveRequestGetAllRequest = (request: ILeaveRequestGetAllRequest) => action(LeaveRequestAction.GET_ALL_REQUEST, request);
export const leaveRequestGetAllSuccess = (response: IResponseCollection<ILeave>) => action(LeaveRequestAction.GET_ALL_SUCCESS, response);
export const leaveRequestGetAllError = (message: string) => action(LeaveRequestAction.GET_ALL_ERROR, message);
export const leaveRequestGetAllDispose = () => action(LeaveRequestAction.GET_ALL_DISPOSE);

// get by id
export const leaveRequestGetByIdRequest = (request: ILeaveRequestGetByIdRequest) => action(LeaveRequestAction.GET_BY_ID_REQUEST, request);
export const leaveRequestGetByIdSuccess = (response: IResponseSingle<ILeaveDetail>) => action(LeaveRequestAction.GET_BY_ID_SUCCESS, response);
export const leaveRequestGetByIdError = (message: string) => action(LeaveRequestAction.GET_BY_ID_ERROR, message);
export const leaveRequestGetByIdDispose = () => action(LeaveRequestAction.GET_BY_ID_DISPOSE);

// get end
export const leaveRequestFetchRequest = (request: ILeaveGetEndQuery) => action(LeaveRequestAction.FETCH_REQUEST, request);
export const leaveRequestFetchSuccess = (response: IResponseSingle<ILeaveGetEnd>) => action(LeaveRequestAction.FETCH_SUCCESS, response);
export const leaveRequestFetchError = (message: string) => action(LeaveRequestAction.FETCH_ERROR, message);
export const leaveRequestFetchDispose = () => action(LeaveRequestAction.FETCH_DISPOSE);

// post
export const leaveRequestPostRequest = (request: ILeaveRequestPostRequest) => action(LeaveRequestAction.POST_REQUEST, request);
export const leaveRequestPostSuccess = (response: IResponseSingle<ILeave>) => action(LeaveRequestAction.POST_SUCCESS, response);
export const leaveRequestPostError = (message: string) => action(LeaveRequestAction.POST_ERROR, message);
export const leaveRequestPostDispose = () => action(LeaveRequestAction.POST_DISPOSE);

// put
export const leaveRequestPutRequest = (request: ILeaveRequestPutRequest) => action(LeaveRequestAction.PUT_REQUEST, request);
export const leaveRequestPutSuccess = (response: IResponseSingle<ILeave>) => action(LeaveRequestAction.PUT_SUCCESS, response);
export const leaveRequestPutError = (message: string) => action(LeaveRequestAction.PUT_ERROR, message);
export const leaveRequestPutDispose = () => action(LeaveRequestAction.PUT_DISPOSE);