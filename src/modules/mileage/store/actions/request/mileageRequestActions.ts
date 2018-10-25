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
  GET_ALL_REQUEST = '@@mileage/request/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@mileage/request/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@mileage/request/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@mileage/request/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@mileage/request/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@mileage/request/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@mileage/request/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@mileage/request/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@mileage/request/POST_REQUEST',
  POST_SUCCESS = '@@mileage/request/POST_SUCCESS',
  POST_ERROR = '@@mileage/request/POST_ERROR',
  POST_DISPOSE = '@@mileage/request/POST_DISPOSE'
}

// get all
export const mileageRequestGetAllRequest = (request: IMileageRequestGetAllRequest) => action(MileageRequestAction.GET_ALL_REQUEST, request);
export const mileageRequestGetAllSuccess = (response: IResponseCollection<IMileageRequest>) => action(MileageRequestAction.GET_ALL_SUCCESS, response);
export const mileageRequestGetAllError = (message: string) => action(MileageRequestAction.GET_ALL_ERROR, message);
export const mileageRequestGetAllDispose = () => action(MileageRequestAction.GET_ALL_DISPOSE);

// get by id
export const mileageRequestGetByIdRequest = (request: IMileageRequestGetByIdRequest) => action(MileageRequestAction.GET_BY_ID_REQUEST, request);
export const mileageRequestGetByIdSuccess = (response: IResponseSingle<IMileageRequestDetail>) => action(MileageRequestAction.GET_BY_ID_SUCCESS, response);
export const mileageRequestGetByIdError = (message: string) => action(MileageRequestAction.GET_BY_ID_ERROR, message);
export const mileageRequestGetByIdDispose = () => action(MileageRequestAction.GET_BY_ID_DISPOSE);

// post
export const mileageRequestPostRequest = (request: IMileageRequestPostRequest) => action(MileageRequestAction.POST_REQUEST, request);
export const mileageRequestPostSuccess = (response: IResponseSingle<IMileageRequest>) => action(MileageRequestAction.POST_SUCCESS, response);
export const mileageRequestPostError = (message: string) => action(MileageRequestAction.POST_ERROR, message);
export const mileageRequestPostDispose = () => action(MileageRequestAction.POST_DISPOSE);
  