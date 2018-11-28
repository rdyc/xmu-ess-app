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

export const enum MileageExceptionAction {
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
export const mileageExceptionGetAllRequest = (
  request: IMileageExceptionAllRequest
) => action(MileageExceptionAction.GET_ALL_REQUEST, request);

export const mileageExceptionGetAllSuccess = (
  response: IResponseCollection<IMileageException>
) => action(MileageExceptionAction.GET_ALL_SUCCESS, response);

export const mileageExceptionGetAllError = (message: string) =>
  action(MileageExceptionAction.GET_ALL_ERROR, message);

export const mileageExceptionGetAllDispose = () =>
  action(MileageExceptionAction.GET_ALL_DISPOSE);

// get list
export const mileageExceptionGetListRequest = (
  request: IMileageExceptionListRequest
) => action(MileageExceptionAction.GET_LIST_REQUEST, request);

export const mileageExceptionGetListSuccess = (
  response: IResponseCollection<IMileageExceptionList>
) => action(MileageExceptionAction.GET_LIST_SUCCESS, response);

export const mileageExceptionGetListError = (message: string) =>
  action(MileageExceptionAction.GET_LIST_ERROR, message);

export const mileageExceptionGetListDispose = () =>
  action(MileageExceptionAction.GET_LIST_DISPOSE);

// get by id
export const mileageExceptionGetByIdRequest = (
  request: IMileageExceptionByIdRequest
) => action(MileageExceptionAction.GET_BY_ID_REQUEST, request);

export const mileageExceptionGetByIdSuccess = (
  response: IResponseCollection<IMileageExceptionDetail>
) => action(MileageExceptionAction.GET_BY_ID_SUCCESS, response);

export const mileageExceptionGetByIdError = (message: string) =>
  action(MileageExceptionAction.GET_BY_ID_ERROR, message);

export const mileageExceptionGetByIdDispose = () =>
  action(MileageExceptionAction.GET_BY_ID_DISPOSE);

// post
export const mileageExceptionPostRequest = (request: IMileageExceptionPostRequest) => action(MileageExceptionAction.POST_REQUEST, request);
export const mileageExceptionPostSuccess = (response: IResponseSingle<IMileageException>) => action(MileageExceptionAction.POST_SUCCESS, response);
export const mileageExceptionPostError = (message: string) => action(MileageExceptionAction.POST_ERROR, message);
export const mileageExceptionPostDispose = () => action(MileageExceptionAction.POST_DISPOSE);

// put
export const mileageExceptionPutRequest = (request: IMileageExceptionPutRequest) => action(MileageExceptionAction.PUT_REQUEST, request);
export const mileageExceptionPutSuccess = (response: IResponseSingle<IMileageException>) => action(MileageExceptionAction.PUT_SUCCESS, response);
export const mileageExceptionPutError = (message: string) => action(MileageExceptionAction.PUT_ERROR, message);
export const mileageExceptionPutDispose = () => action(MileageExceptionAction.PUT_DISPOSE);