import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  IMileageExceptionAllRequest,
  IMileageExceptionByIdRequest,
  IMileageExceptionListRequest,
  IMileageExceptionPostRequest,
  IMileageExceptionPutRequest
} from '@lookup/classes/queries';
import {
  IMileageException,
  IMileageExceptionDetail,
  IMileageExceptionList
} from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupMileageExceptionAction {
  GET_ALL_REQUEST = '@@lookup/mileageException/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/mileageException/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/mileageException/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/mileageException/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/mileageException/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/mileageException/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/mileageException/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/mileageException/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/mileageException/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/mileageException/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/mileageException/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/mileageException/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/mileageException/POST_REQUEST',
  POST_SUCCESS = '@@lookup/mileageException/POST_SUCCESS',
  POST_ERROR = '@@lookup/mileageException/POST_ERROR',
  POST_DISPOSE = '@@lookup/mileageException/POST_DISPOSE',
  PUT_REQUEST = '@@lookup/mileageException/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/mileageException/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/mileageException/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/mileageException/PUT_DISPOSE'
}

// get all
export const lookupMileageExceptionGetAllRequest = (request: IMileageExceptionAllRequest) => action(LookupMileageExceptionAction.GET_ALL_REQUEST, request);
export const lookupMileageExceptionGetAllSuccess = (response: IResponseCollection<IMileageException>) => action(LookupMileageExceptionAction.GET_ALL_SUCCESS, response);
export const lookupMileageExceptionGetAllError = (error: any) => action(LookupMileageExceptionAction.GET_ALL_ERROR, error);
export const lookupMileageExceptionGetAllDispose = () => action(LookupMileageExceptionAction.GET_ALL_DISPOSE);

// get list
export const lookupMileageExceptionGetListRequest = (request: IMileageExceptionListRequest) => action(LookupMileageExceptionAction.GET_LIST_REQUEST, request);
export const lookupMileageExceptionGetListSuccess = (response: IResponseCollection<IMileageExceptionList>) => action(LookupMileageExceptionAction.GET_LIST_SUCCESS, response);
export const lookupMileageExceptionGetListError = (error: any) => action(LookupMileageExceptionAction.GET_LIST_ERROR, error);
export const lookupMileageExceptionGetListDispose = () => action(LookupMileageExceptionAction.GET_LIST_DISPOSE);

// get by id
export const lookupMileageExceptionGetByIdRequest = (request: IMileageExceptionByIdRequest) => action(LookupMileageExceptionAction.GET_BY_ID_REQUEST, request);
export const lookupMileageExceptionGetByIdSuccess = (response: IResponseCollection<IMileageExceptionDetail>) => action(LookupMileageExceptionAction.GET_BY_ID_SUCCESS, response);
export const lookupMileageExceptionGetByIdError = (error: any) => action(LookupMileageExceptionAction.GET_BY_ID_ERROR, error);
export const lookupMileageExceptionGetByIdDispose = () => action(LookupMileageExceptionAction.GET_BY_ID_DISPOSE);

// post
export const lookupMileageExceptionPostRequest = (request: IMileageExceptionPostRequest) => action(LookupMileageExceptionAction.POST_REQUEST, request);
export const lookupMileageExceptionPostSuccess = (response: IResponseSingle<IMileageException>) => action(LookupMileageExceptionAction.POST_SUCCESS, response);
export const lookupMileageExceptionPostError = (error: any) => action(LookupMileageExceptionAction.POST_ERROR, error);
export const lookupMileageExceptionPostDispose = () => action(LookupMileageExceptionAction.POST_DISPOSE);

// put
export const lookupMileageExceptionPutRequest = (request: IMileageExceptionPutRequest) => action(LookupMileageExceptionAction.PUT_REQUEST, request);
export const lookupMileageExceptionPutSuccess = (response: IResponseSingle<IMileageException>) => action(LookupMileageExceptionAction.PUT_SUCCESS, response);
export const lookupMileageExceptionPutError = (error: any) => action(LookupMileageExceptionAction.PUT_ERROR, error);
export const lookupMileageExceptionPutDispose = () => action(LookupMileageExceptionAction.PUT_DISPOSE);