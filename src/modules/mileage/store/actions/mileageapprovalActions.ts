import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  IMileageApprovalGetAllRequest,
  IMileageApprovalGetByIdRequest,
  IMileageApprovalPostRequest
} from '@mileage/classes/queries';
import {
  IMileageApproval,
  IMileageApprovalDetail
} from '@mileage/classes/response';
import { action } from 'typesafe-actions';

export const enum MileageApprovalAction {
  GET_ALL_REQUEST = '@@mileageApproval/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@mileageApproval/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@mileageApproval/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@mileageApproval/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@mileageApproval/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@mileageApproval/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@mileageApproval/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@mileageApproval/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@mileageApproval/POST_REQUEST',
  POST_SUCCESS = '@@mileageApproval/POST_SUCCESS',
  POST_ERROR = '@@mileageApproval/POST_ERROR',
  POST_DISPOSE = '@@mileageApproval/POST_DISPOSE'
}

// get all
export const mileageapprovalGetAllRequest = (
  request: IMileageApprovalGetAllRequest
) => action(MileageApprovalAction.GET_ALL_REQUEST, request);

export const mileageapprovalGetAllSuccess = (
  response: IResponseCollection<IMileageApproval>
) => action(MileageApprovalAction.GET_ALL_SUCCESS, response);

export const mileageapprovalGetAllError = (message: string) =>
  action(MileageApprovalAction.GET_ALL_ERROR, message);

export const mileageapprovalGetAllDispose = () =>
  action(MileageApprovalAction.GET_ALL_DISPOSE);

// get by id
export const mileageapprovalGetByIdRequest = (
  request: IMileageApprovalGetByIdRequest
) => action(MileageApprovalAction.GET_BY_ID_REQUEST, request);

export const mileageapprovalGetByIdSuccess = (
  response: IResponseSingle<IMileageApprovalDetail>
) => action(MileageApprovalAction.GET_BY_ID_SUCCESS, response);

export const mileageapprovalGetByIdError = (message: string) =>
  action(MileageApprovalAction.GET_BY_ID_ERROR, message);

export const mileageapprovalGetByIdDispose = () =>
  action(MileageApprovalAction.GET_BY_ID_DISPOSE);

  // post
export const mileageapprovalPostRequest = (request: IMileageApprovalPostRequest) => action(MileageApprovalAction.POST_REQUEST, request);
export const mileageapprovalPostSuccess = (response: IResponseSingle<IMileageApproval>) => action(MileageApprovalAction.POST_SUCCESS, response);
export const mileageapprovalPostError = (message: string) => action(MileageApprovalAction.POST_ERROR, message);
export const mileageapprovalPostDispose = () => action(MileageApprovalAction.POST_DISPOSE);
