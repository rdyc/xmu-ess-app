import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum LeaveAction {
  GET_ALL_REQUEST = '@@system/leave/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/leave/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/leave/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/leave/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/laeve/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/leave/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/leave/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/leave/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/leave/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/leave/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/leave/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/leave/GET_BY_ID_DISPOSE',
}

// get all
export const leaveGetAllRequest = (request: ISystemAllRequest) => action(LeaveAction.GET_ALL_REQUEST, request);
export const leaveGetAllSuccess = (response: IResponseCollection<ISystem>) => action(LeaveAction.GET_ALL_SUCCESS, response);
export const leaveGetAllError = (error: any) => action(LeaveAction.GET_ALL_ERROR, error);
export const leaveGetAllDispose = () => action(LeaveAction.GET_ALL_DISPOSE);

// get list
export const leaveGetListRequest = (request: ISystemListRequest) => action(LeaveAction.GET_LIST_REQUEST, request);
export const leaveGetListSuccess = (response: IResponseCollection<ISystemList>) => action(LeaveAction.GET_LIST_SUCCESS, response);
export const leaveGetListError = (error: any) => action(LeaveAction.GET_LIST_ERROR, error);
export const leaveGetListDispose = () => action(LeaveAction.GET_LIST_DISPOSE);

// get by id
export const leaveGetByIdRequest = (request: ISystemByIdRequest) => action(LeaveAction.GET_BY_ID_REQUEST, request);
export const leaveGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(LeaveAction.GET_BY_ID_SUCCESS, response);
export const leaveGetByIdError = (error: any) => action(LeaveAction.GET_BY_ID_ERROR, error);
export const leaveGetByIdDispose = () => action(LeaveAction.GET_BY_ID_DISPOSE);