import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { ILookupLeaveGetAllRequest, ILookupLeaveGetDetailRequest, ILookupLeaveGetListRequest, ILookupLeavePostRequest, ILookupLeavePutRequest } from '@lookup/classes/queries';
import { ILookupLeave, ILookupLeaveDetail, ILookupLeaveList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupLeaveAction {
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
  POST_REQUEST = '@@leave/POST_REQUEST',
  POST_SUCCESS = '@@leave/POST_SUCCESS',
  POST_ERROR = '@@leave/POST_ERROR',
  POST_DISPOSE = '@@leave/POST_DISPOSE',
  PUT_REQUEST = '@@leave/PUT_REQUEST',
  PUT_SUCCESS = '@@leave/PUT_SUCCESS',
  PUT_ERROR = '@@leave/PUT_ERROR',
  PUT_DISPOSE = '@@leave/PUT_DISPOSE',
}

// get all
export const lookupLeaveGetAllRequest = (request: ILookupLeaveGetAllRequest) => action(LookupLeaveAction.GET_ALL_REQUEST, request);
export const lookupLeaveGetAllSuccess = (response: IResponseCollection<ILookupLeave>) => action(LookupLeaveAction.GET_ALL_SUCCESS, response);
export const lookupLeaveGetAllError = (message: string) => action(LookupLeaveAction.GET_ALL_ERROR, message);
export const lookupLeaveGetAllDispose = () => action(LookupLeaveAction.GET_ALL_DISPOSE);

// get list
export const lookupLeaveGetListRequest = (request: ILookupLeaveGetListRequest) => action(LookupLeaveAction.GET_LIST_REQUEST, request);
export const lookupLeaveGetListSuccess = (response: IResponseCollection<ILookupLeaveList>) => action(LookupLeaveAction.GET_LIST_SUCCESS, response);
export const lookupLeaveGetListError = (message: string) => action(LookupLeaveAction.GET_LIST_ERROR, message);
export const lookupLeaveGetListDispose = () => action(LookupLeaveAction.GET_LIST_DISPOSE);

// get by id
export const lookupLeaveGetByIdRequest = (request: ILookupLeaveGetDetailRequest) => action(LookupLeaveAction.GET_BY_ID_REQUEST, request);
export const lookupLeaveGetByIdSuccess = (response: IResponseCollection<ILookupLeaveDetail>) => action(LookupLeaveAction.GET_BY_ID_SUCCESS, response);
export const lookupLeaveGetByIdError = (message: string) => action(LookupLeaveAction.GET_BY_ID_ERROR, message);
export const lookupLeaveGetByIdDispose = () => action(LookupLeaveAction.GET_BY_ID_DISPOSE);

// post
export const lookupLeavePostRequest = (request: ILookupLeavePostRequest) => action(LookupLeaveAction.POST_REQUEST, request);
export const lookupLeavePostSuccess = (response: IResponseSingle<ILookupLeave>) => action(LookupLeaveAction.POST_SUCCESS, response);
export const lookupLeavePostError = (message: string) => action(LookupLeaveAction.POST_ERROR, message);
export const lookupLeavePostDispose = () => action(LookupLeaveAction.POST_DISPOSE);

// put
export const lookupLeavePutRequest = (request: ILookupLeavePutRequest) => action(LookupLeaveAction.PUT_REQUEST, request);
export const lookupLeavePutSuccess = (response: IResponseSingle<ILookupLeave>) => action(LookupLeaveAction.PUT_SUCCESS, response);
export const lookupLeavePutError = (message: string) => action(LookupLeaveAction.PUT_ERROR, message);
export const lookupLeavePutDispose = () => action(LookupLeaveAction.PUT_DISPOSE);