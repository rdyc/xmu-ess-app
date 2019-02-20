import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ILeaveApprovalGetAllRequest,
  ILeaveApprovalGetByIdRequest,
  ILeaveApprovalPostRequest,
} from '@leave/classes/queries/approval';
import { ILeave, ILeaveDetail } from '@leave/classes/response';
import { action } from 'typesafe-actions';

export const enum LeaveApprovalAction {
  GET_ALL_REQUEST = '@@leaveApproval/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@leaveApproval/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@leaveApproval/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@leaveApproval/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@leaveApproval/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@leaveApproval/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@leaveApproval/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@leaveApproval/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@leaveApproval/POST_REQUEST',
  POST_SUCCESS = '@@leaveApproval/POST_SUCCESS',
  POST_ERROR = '@@leaveApproval/POST_ERROR',
  POST_DISPOSE = '@@leaveApproval/POST_DISPOSE',
}

// get all
export const leaveApprovalGetAllRequest = (request: ILeaveApprovalGetAllRequest) => action(LeaveApprovalAction.GET_ALL_REQUEST, request);
export const leaveApprovalGetAllSuccess = (response: IResponseCollection<ILeave>) => action(LeaveApprovalAction.GET_ALL_SUCCESS, response);
export const leaveApprovalGetAllError = (error: any) => action(LeaveApprovalAction.GET_ALL_ERROR, error);
export const leaveApprovalGetAllDispose = () => action(LeaveApprovalAction.GET_ALL_DISPOSE);

// get by id
export const leaveApprovalGetByIdRequest = (request: ILeaveApprovalGetByIdRequest) => action(LeaveApprovalAction.GET_BY_ID_REQUEST, request);
export const leaveApprovalGetByIdSuccess = (response: IResponseSingle<ILeaveDetail>) => action(LeaveApprovalAction.GET_BY_ID_SUCCESS, response);
export const leaveApprovalGetByIdError = (error: any) => action(LeaveApprovalAction.GET_BY_ID_ERROR, error);
export const leaveApprovalGetByIdDispose = () => action(LeaveApprovalAction.GET_BY_ID_DISPOSE);

// post
export const leaveApprovalPostRequest = (request: ILeaveApprovalPostRequest) => action(LeaveApprovalAction.POST_REQUEST, request);
export const leaveApprovalPostSuccess = (response: IResponseSingle<ILeave>) => action(LeaveApprovalAction.POST_SUCCESS, response);
export const leaveApprovalPostError = (error: any) => action(LeaveApprovalAction.POST_ERROR, error);
export const leaveApprovalPostDispose = () => action(LeaveApprovalAction.POST_DISPOSE);