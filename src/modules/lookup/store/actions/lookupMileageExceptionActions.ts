import { IResponseCollection } from '@generic/interfaces';
import {
  ILookupMileageExceptionAllRequest,
  ILookupMileageExceptionByIdRequest,
  ILookupMileageExceptionListRequest
} from '@lookup/classes/queries/mileageException';
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
  PUT_REQUEST = '@@lookup/mileageException/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/mileageException/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/mileageException/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/mileageException/PUT_DISPOSE'
}

// get all
export const lookupMileageExceptionGetAllRequest = (
  request: ILookupMileageExceptionAllRequest
) => action(LookupMileageExceptionAction.GET_ALL_REQUEST, request);

export const lookupMileageExceptionGetAllSuccess = (
  response: IResponseCollection<IMileageException>
) => action(LookupMileageExceptionAction.GET_ALL_SUCCESS, response);

export const lookupMileageExceptionGetAllError = (message: string) =>
  action(LookupMileageExceptionAction.GET_ALL_ERROR, message);

export const lookupMileageExceptionGetAllDispose = () =>
  action(LookupMileageExceptionAction.GET_ALL_DISPOSE);

// get list
export const lookupMileageExceptionGetListRequest = (
  request: ILookupMileageExceptionListRequest
) => action(LookupMileageExceptionAction.GET_LIST_REQUEST, request);

export const lookupMileageExceptionGetListSuccess = (
  response: IResponseCollection<IMileageExceptionList>
) => action(LookupMileageExceptionAction.GET_LIST_SUCCESS, response);

export const lookupMileageExceptionGetListError = (message: string) =>
  action(LookupMileageExceptionAction.GET_LIST_ERROR, message);

export const lookupMileageExceptionGetListDispose = () =>
  action(LookupMileageExceptionAction.GET_LIST_DISPOSE);

// get by id
export const lookupMileageExceptionGetByIdRequest = (
  request: ILookupMileageExceptionByIdRequest
) => action(LookupMileageExceptionAction.GET_BY_ID_REQUEST, request);

export const lookupMileageExceptionGetByIdSuccess = (
  response: IResponseCollection<IMileageExceptionDetail>
) => action(LookupMileageExceptionAction.GET_BY_ID_SUCCESS, response);

export const lookupMileageExceptionGetByIdError = (message: string) =>
  action(LookupMileageExceptionAction.GET_BY_ID_ERROR, message);

export const lookupMileageExceptionGetByIdDispose = () =>
  action(LookupMileageExceptionAction.GET_BY_ID_DISPOSE);