import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { ILookupCustomerGetAllRequest, ILookupCustomerGetDetailRequest, ILookupCustomerGetListRequest } from '@lookup/classes/queries';
import {
  ILookupCustomerDeleteRequest,
  ILookupCustomerPostRequest,
  ILookupCustomerPutRequest,
} from '@lookup/classes/queries/customer';
import { ICustomer, ICustomerDetail, ICustomerList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupCustomerAction {
  GET_ALL_REQUEST = '@@lookup/customer/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/customer/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/customer/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/customer/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/customer/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/customer/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/customer/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/customer/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/customer/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/customer/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/customer/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/customer/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/customer/POST_REQUEST',
  POST_SUCCESS = '@@lookup/customer/POST_SUCCESS',
  POST_ERROR = '@@lookup/customer/POST_ERROR',
  POST_DISPOSE = '@@lookup/customer/POST_DISPOSE',
  PUT_REQUEST = '@@lookup/customer/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/customer/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/customer/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/customer/DELETE_DISPOSE',
  DELETE_REQUEST = '@@lookup/customer/DELETE_REQUEST',
  DELETE_SUCCESS = '@@lookup/customer/DELETE_SUCCESS',
  DELETE_ERROR = '@@lookup/customer/DELETE_ERROR',
  DELETE_DISPOSE = '@@lookup/customer/DELETE_DISPOSE',
}

// get all
export const lookupCustomerGetAllRequest = (request: ILookupCustomerGetAllRequest) => action(LookupCustomerAction.GET_ALL_REQUEST, request);
export const lookupCustomerGetAllSuccess = (response: IResponseCollection<ICustomer>) => action(LookupCustomerAction.GET_ALL_SUCCESS, response);
export const lookupCustomerGetAllError = (message: string) => action(LookupCustomerAction.GET_ALL_ERROR, message);
export const lookupCustomerGetAllDispose = () => action(LookupCustomerAction.GET_ALL_DISPOSE);

// get list
export const lookupCustomerGetListRequest = (request: ILookupCustomerGetListRequest) => action(LookupCustomerAction.GET_LIST_REQUEST, request);
export const lookupCustomerGetListSuccess = (response: IResponseCollection<ICustomerList>) => action(LookupCustomerAction.GET_LIST_SUCCESS, response);
export const lookupCustomerGetListError = (message: string) => action(LookupCustomerAction.GET_LIST_ERROR, message);
export const lookupCustomerGetListDispose = () => action(LookupCustomerAction.GET_LIST_DISPOSE);

// get by id
export const lookupCustomerGetByIdRequest = (request: ILookupCustomerGetDetailRequest) => action(LookupCustomerAction.GET_BY_ID_REQUEST, request);
export const lookupCustomerGetByIdSuccess = (response: IResponseSingle<ICustomerDetail>) => action(LookupCustomerAction.GET_BY_ID_SUCCESS, response);
export const lookupCustomerGetByIdError = (message: string) => action(LookupCustomerAction.GET_BY_ID_ERROR, message);
export const lookupCustomerGetByIdDispose = () => action(LookupCustomerAction.GET_BY_ID_DISPOSE);

// post
export const lookupCustomerPostRequest = (request: ILookupCustomerPostRequest) => action(LookupCustomerAction.POST_REQUEST, request);
export const lookupCustomerPostSuccess = (response: IResponseSingle<ICustomer>) => action(LookupCustomerAction.POST_SUCCESS, response);
export const lookupCustomerPostError = (message: string) => action(LookupCustomerAction.POST_ERROR, message);
export const lookupCustomerPostDispose = () => action(LookupCustomerAction.POST_DISPOSE);

// put
export const lookupCustomerPutRequest = (request: ILookupCustomerPutRequest) => action(LookupCustomerAction.PUT_REQUEST, request);
export const lookupCustomerPutSuccess = (response: IResponseSingle<ICustomer>) => action(LookupCustomerAction.PUT_SUCCESS, response);
export const lookupCustomerPutError = (message: string) => action(LookupCustomerAction.PUT_ERROR, message);
export const lookupCustomerPutDispose = () => action(LookupCustomerAction.PUT_DISPOSE);

// delete
export const lookupCustomerDeleteRequest = (request: ILookupCustomerDeleteRequest) => action(LookupCustomerAction.DELETE_REQUEST, request);
export const lookupCustomerDeleteSuccess = (response: boolean) => action(LookupCustomerAction.DELETE_SUCCESS, response);
export const lookupCustomerDeleteError = (message: string) => action(LookupCustomerAction.DELETE_ERROR, message);
export const lookupCustomerDeleteDispose = () => action(LookupCustomerAction.DELETE_DISPOSE);