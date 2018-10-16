import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { ILeaveAllRequest, ILeaveByIdRequest, ILeaveListRequest, ILeavePutRequest } from '@lookup/classes/queries';
import { ILeave, ILeaveDetail, ILeaveList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LeaveAction {
  GET_ALL_REQUEST = '@@leave/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@leave/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@leave/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@leave/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@leave/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@leave/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@leave/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@leave/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@leave/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@leave/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@leave/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@leave/GET_BY_ID_DISPOSE',
  PUT_REQUEST = '@@leave/PUT_REQUEST',
  PUT_SUCCESS = '@@leave/PUT_SUCCESS',
  PUT_ERROR = '@@leave/PUT_ERROR',
  PUT_DISPOSE = '@@leave/PUT_DISPOSE',
}

// get all
export const leaveGetAllRequest = (request: ILeaveAllRequest) => action(LeaveAction.GET_ALL_REQUEST, request);
export const leaveGetAllSuccess = (response: IResponseCollection<ILeave>) => action(LeaveAction.GET_ALL_SUCCESS, response);
export const leaveGetAllError = (message: string) => action(LeaveAction.GET_ALL_ERROR, message);
export const leaveGetAllDispose = () => action(LeaveAction.GET_ALL_DISPOSE);

// get list
export const leaveGetListRequest = (request: ILeaveListRequest) => action(LeaveAction.GET_LIST_REQUEST, request);
export const leaveGetListSuccess = (response: IResponseCollection<ILeaveList>) => action(LeaveAction.GET_LIST_SUCCESS, response);
export const leaveGetListError = (message: string) => action(LeaveAction.GET_LIST_ERROR, message);
export const leaveGetListDispose = () => action(LeaveAction.GET_LIST_DISPOSE);

// get by id
export const leaveGetByIdRequest = (request: ILeaveByIdRequest) => action(LeaveAction.GET_BY_ID_REQUEST, request);
export const leaveGetByIdSuccess = (response: IResponseCollection<ILeaveDetail>) => action(LeaveAction.GET_BY_ID_SUCCESS, response);
export const leaveGetByIdError = (message: string) => action(LeaveAction.GET_BY_ID_ERROR, message);
export const leaveGetByIdDispose = () => action(LeaveAction.GET_BY_ID_DISPOSE);

// put
export const leavePutRequest = (request: ILeavePutRequest) => action(LeaveAction.PUT_REQUEST, request);
export const leavePutSuccess = (response: IResponseSingle<ILeave>) => action(LeaveAction.PUT_SUCCESS, response);
export const leavePutError = (message: string) => action(LeaveAction.PUT_ERROR, message);
export const leavePutDispose = () => action(LeaveAction.PUT_DISPOSE);