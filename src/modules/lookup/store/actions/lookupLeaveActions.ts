import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { ILookupLeaveDeleteRequest, ILookupLeaveGetAllRequest, ILookupLeaveGetDetailRequest, ILookupLeaveGetListRequest, ILookupLeavePostRequest, ILookupLeavePutRequest } from '@lookup/classes/queries';
import { ILookupLeave, ILookupLeaveDetail, ILookupLeaveList } from '@lookup/classes/response';
import { LookupLeaveTabs } from '@lookup/classes/types';
import { action } from 'typesafe-actions';

export const enum LookupLeaveAction {
  GET_ALL_REQUEST = '@@lookup/leave/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/leave/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/leave/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/leave/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/leave/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/leave/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/leave/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/leave/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/leave/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/leave/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/leave/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/leave/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/leave/POST_REQUEST',
  POST_SUCCESS = '@@lookup/leave/POST_SUCCESS',
  POST_ERROR = '@@lookup/leave/POST_ERROR',
  POST_DISPOSE = '@@lookup/leave/POST_DISPOSE',
  PUT_REQUEST = '@@lookup/leave/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/leave/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/leave/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/leave/PUT_DISPOSE',
  DELETE_REQUEST = '@@lookup/leave/DELETE_REQUEST',
  DELETE_SUCCESS = '@@lookup/leave/DELETE_SUCCESS',
  DELETE_ERROR = '@@lookup/leave/DELETE_ERROR',
  DELETE_DISPOSE = '@@lookup/leave/DELETE_DISPOSE',
  CHANGE_PAGE = '@@lookup/leave/CHANGE_PAGE'
}

// get all
export const lookupLeaveGetAllRequest = (request: ILookupLeaveGetAllRequest) => action(LookupLeaveAction.GET_ALL_REQUEST, request);
export const lookupLeaveGetAllSuccess = (response: IResponseCollection<ILookupLeave>) => action(LookupLeaveAction.GET_ALL_SUCCESS, response);
export const lookupLeaveGetAllError = (error: any) => action(LookupLeaveAction.GET_ALL_ERROR, error);
export const lookupLeaveGetAllDispose = () => action(LookupLeaveAction.GET_ALL_DISPOSE);

// get list
export const lookupLeaveGetListRequest = (request: ILookupLeaveGetListRequest) => action(LookupLeaveAction.GET_LIST_REQUEST, request);
export const lookupLeaveGetListSuccess = (response: IResponseCollection<ILookupLeaveList>) => action(LookupLeaveAction.GET_LIST_SUCCESS, response);
export const lookupLeaveGetListError = (error: any) => action(LookupLeaveAction.GET_LIST_ERROR, error);
export const lookupLeaveGetListDispose = () => action(LookupLeaveAction.GET_LIST_DISPOSE);

// get by id
export const lookupLeaveGetByIdRequest = (request: ILookupLeaveGetDetailRequest) => action(LookupLeaveAction.GET_BY_ID_REQUEST, request);
export const lookupLeaveGetByIdSuccess = (response: IResponseCollection<ILookupLeaveDetail>) => action(LookupLeaveAction.GET_BY_ID_SUCCESS, response);
export const lookupLeaveGetByIdError = (error: any) => action(LookupLeaveAction.GET_BY_ID_ERROR, error);
export const lookupLeaveGetByIdDispose = () => action(LookupLeaveAction.GET_BY_ID_DISPOSE);

// post
export const lookupLeavePostRequest = (request: ILookupLeavePostRequest) => action(LookupLeaveAction.POST_REQUEST, request);
export const lookupLeavePostSuccess = (response: IResponseSingle<ILookupLeave>) => action(LookupLeaveAction.POST_SUCCESS, response);
export const lookupLeavePostError = (error: any) => action(LookupLeaveAction.POST_ERROR, error);
export const lookupLeavePostDispose = () => action(LookupLeaveAction.POST_DISPOSE);

// put
export const lookupLeavePutRequest = (request: ILookupLeavePutRequest) => action(LookupLeaveAction.PUT_REQUEST, request);
export const lookupLeavePutSuccess = (response: IResponseSingle<ILookupLeave>) => action(LookupLeaveAction.PUT_SUCCESS, response);
export const lookupLeavePutError = (error: any) => action(LookupLeaveAction.PUT_ERROR, error);
export const lookupLeavePutDispose = () => action(LookupLeaveAction.PUT_DISPOSE);

// delete
export const lookupLeaveDeleteRequest = (request: ILookupLeaveDeleteRequest) => action(LookupLeaveAction.DELETE_REQUEST, request);
export const lookupLeaveDeleteSuccess = (response: IResponseSingle<ILookupLeave>) => action(LookupLeaveAction.DELETE_SUCCESS, response);
export const lookupLeaveDeleteError = (error: any) => action(LookupLeaveAction.DELETE_ERROR, error);
export const lookupLeaveDeleteDispose = () => action(LookupLeaveAction.DELETE_DISPOSE);

// change page
export const lookupLeaveChangePage = (leavePage: LookupLeaveTabs) => action(LookupLeaveAction.CHANGE_PAGE, leavePage);