import { IResponseCollection, IResponseList, IResponseSingle } from '@generic/interfaces';
import {
  ILeaveRequestGetAllRequest,
  ILeaveRequestGetByIdRequest,
  // ILeaveRequestPostRequest,
  // ILeavePutRequest,
} from '@leave/classes/queries';
import { ILeaveGetListRequest } from '@leave/classes/queries/ILeaveGetListRequest';
import { ILeaveRequest, ILeaveRequestDetail } from '@pleave/classes/response';
import { action } from 'typesafe-actions';

export const enum LeaveRequestAction {
  GET_ALL_REQUEST = '@@leaveRequest/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@leaveRequest/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@leaveRequest/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@leaveRequest/GET_ALL_DISPOSE',
  // GET_LIST_REQUEST = '@@leaveRequest/GET_LIST_REQUEST',
  // GET_LIST_SUCCESS = '@@leaveRequest/GET_LIST_SUCCESS',
  // GET_LIST_ERROR = '@@leaveRequest/GET_LIST_ERROR',
  // GET_LIST_DISPOSE = '@@leaveRequest/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@leaveRequest/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@leaveRequest/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@leaveRequest/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@leaveRequest/GET_BY_ID_DISPOSE',
  // POST_REQUEST = '@@leaveRequest/POST_REQUEST',
  // POST_SUCCESS = '@@leaveRequest/POST_SUCCESS',
  // POST_ERROR = '@@leaveRequest/POST_ERROR',
  // POST_DISPOSE = '@@leaveRequest/POST_DISPOSE',
  // PUT_REQUEST = '@@leaveRequest/PUT_REQUEST',
  // PUT_SUCCESS = '@@leaveRequest/PUT_SUCCESS',
  // PUT_ERROR = '@@leaveRequest/PUT_ERROR',
  // PUT_DISPOSE = '@@leaveRequest/PUT_DISPOSE',
}

// get all
export const leaveRequestGetAllRequest = (request: ILeaveRequestGetAllRequest) => action(LeaveRequestAction.GET_ALL_REQUEST, request);
export const leaveRequestGetAllSuccess = (response: IResponseCollection<ILeaveRequest>) => action(LeaveRequestAction.GET_ALL_SUCCESS, response);
export const leaveRequestGetAllError = (message: string) => action(LeaveRequestAction.GET_ALL_ERROR, message);
export const leaveRequestGetAllDispose = () => action(LeaveRequestAction.GET_ALL_DISPOSE);

// // get list
// export const projectGetListRequest = (request: IProjectGetListRequest) => action(ProjectAction.GET_LIST_REQUEST, request);
// export const projectGetListSuccess = (response: IResponseList<IProjectList>) => action(ProjectAction.GET_LIST_SUCCESS, response);
// export const projectGetListError = (message: string) => action(ProjectAction.GET_LIST_ERROR, message);
// export const projectGetListDispose = () => action(ProjectAction.GET_LIST_DISPOSE);

// get by id
export const leaveRequestGetByIdRequest = (request: ILeaveRequestGetByIdRequest) => action(LeaveRequestAction.GET_BY_ID_REQUEST, request);
export const leaveRequestGetByIdSuccess = (response: IResponseSingle<ILeaveRequestDetail>) => action(LeaveRequestAction.GET_BY_ID_SUCCESS, response);
export const leaveRequestGetByIdError = (message: string) => action(LeaveRequestAction.GET_BY_ID_ERROR, message);
export const leaveRequestGetByIdDispose = () => action(LeaveRequestAction.GET_BY_ID_DISPOSE);

// post
export const leaveRequestPostRequest = (request: ILeaveRequestPostRequest) => action(LeaveRequestAction.POST_REQUEST, request);
export const leaveRequestPostSuccess = (response: IResponseSingle<ILeaveRequest>) => action(LeaveRequestAction.POST_SUCCESS, response);
export const leaveRequestPostError = (message: string) => action(LeaveRequestAction.POST_ERROR, message);
export const leaveRequestPostDispose = () => action(LeaveRequestAction.POST_DISPOSE);

// put
export const leaveRequestPutRequest = (request: ILeaveRequestPutRequest) => action(LeaveRequestAction.PUT_REQUEST, request);
export const leaveRequestPutSuccess = (response: IResponseSingle<ILeaveRequest>) => action(LeaveRequestAction.PUT_SUCCESS, response);
export const leaveRequestPutError = (message: string) => action(LeaveRequestAction.PUT_ERROR, message);
export const leaveRequestPutDispose = () => action(LeaveRequestAction.PUT_DISPOSE);