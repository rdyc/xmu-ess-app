import {
  IResponseCollection,
  IResponseSingle
} from '@generic/interfaces';
import {
  IMileageRequestGetAllRequest,
  IMileageRequestGetByIdRequest,
  IMileageRequestPostRequest
} from '@mileage/classes/queries';
import {
  IMileageRequest,
  IMileageRequestDetail
} from '@mileage/classes/response';
import { action } from 'typesafe-actions';

export const enum MileageRequestAction {
  GET_ALL_REQUEST = '@@mileageRequest/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@mileageRequest/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@mileageRequest/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@mileageRequest/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@mileageRequest/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@mileageRequest/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@mileageRequest/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@mileageRequest/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@mileageRequest/POST_REQUEST',
  POST_SUCCESS = '@@mileageRequest/POST_SUCCESS',
  POST_ERROR = '@@mileageRequest/POST_ERROR',
  POST_DISPOSE = '@@mileageRequest/POST_DISPOSE'
}

// get all
export const mileagerequestGetAllRequest = (request: IMileageRequestGetAllRequest) => action(MileageRequestAction.GET_ALL_REQUEST, request);
export const mileagerequestGetAllSuccess = (response: IResponseCollection<IMileageRequest>) => action(MileageRequestAction.GET_ALL_SUCCESS, response);
export const mileagerequestGetAllError = (message: string) => action(MileageRequestAction.GET_ALL_ERROR, message);
export const mileagerequestGetAllDispose = () => action(MileageRequestAction.GET_ALL_DISPOSE);

// get by id
export const mileagerequestGetByIdRequest = (request: IMileageRequestGetByIdRequest) => action(MileageRequestAction.GET_BY_ID_REQUEST, request);
export const mileagerequestGetByIdSuccess = (response: IResponseSingle<IMileageRequestDetail>) => action(MileageRequestAction.GET_BY_ID_SUCCESS, response);
export const mileagerequestGetByIdError = (message: string) => action(MileageRequestAction.GET_BY_ID_ERROR, message);
export const mileagerequestGetByIdDispose = () => action(MileageRequestAction.GET_BY_ID_DISPOSE);

// post
export const mileagerequestPostRequest = (request: IMileageRequestPostRequest) => action(MileageRequestAction.POST_REQUEST, request);
export const mileagerequestPostSuccess = (response: IResponseSingle<IMileageRequest>) => action(MileageRequestAction.POST_SUCCESS, response);
export const mileagerequestPostError = (message: string) => action(MileageRequestAction.POST_ERROR, message);
export const mileagerequestPostDispose = () => action(MileageRequestAction.POST_DISPOSE);
  