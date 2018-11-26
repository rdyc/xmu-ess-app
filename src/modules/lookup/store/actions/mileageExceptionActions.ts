import { IResponseCollection } from '@generic/interfaces';
import {
  IMileageExceptionAllRequest,
  IMileageExceptionByIdRequest,
  IMileageExceptionListRequest
} from '@lookup/classes/queries';
import {
  IMileageException,
  IMileageExceptionDetail,
  IMileageExceptionList
} from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum MileageExceptionAction {
  GET_ALL_REQUEST = '@@mileageException/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@mileageException/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@mileageException/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@mileageException/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@mileageException/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@mileageException/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@mileageException/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@mileageException/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@mileageException/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@mileageException/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@mileageException/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@mileageException/GET_BY_ID_DISPOSE',
  PUT_REQUEST = '@@mileageException/PUT_REQUEST',
  PUT_SUCCESS = '@@mileageException/PUT_SUCCESS',
  PUT_ERROR = '@@mileageException/PUT_ERROR',
  PUT_DISPOSE = '@@mileageException/PUT_DISPOSE'
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
// export const mileageExceptionPostRequest = (request: )