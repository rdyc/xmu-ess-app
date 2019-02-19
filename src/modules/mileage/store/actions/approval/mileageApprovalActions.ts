import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  IMileageApprovalGetAllRequest,
  IMileageApprovalGetByIdRequest,
  IMileageApprovalPostRequest
} from '@mileage/classes/queries';
import {
  IMileageRequest,
  IMileageRequestDetail
} from '@mileage/classes/response';
import { action } from 'typesafe-actions';

export const enum MileageApprovalAction {
  GET_ALL_REQUEST = '@@mileage/approval/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@mileage/approval/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@mileage/approval/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@mileage/approval/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@mileage/approval/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@mileage/approval/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@mileage/approval/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@mileage/approval/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@mileage/approval/POST_REQUEST',
  POST_SUCCESS = '@@mileage/approval/POST_SUCCESS',
  POST_ERROR = '@@mileage/approval/POST_ERROR',
  POST_DISPOSE = '@@mileage/approval/POST_DISPOSE'
}

// get all
export const mileageApprovalGetAllRequest = (
  request: IMileageApprovalGetAllRequest
) => action(MileageApprovalAction.GET_ALL_REQUEST, request);

export const mileageApprovalGetAllSuccess = (
  response: IResponseCollection<IMileageRequest>
) => action(MileageApprovalAction.GET_ALL_SUCCESS, response);

export const mileageApprovalGetAllError = (error: any) =>
  action(MileageApprovalAction.GET_ALL_ERROR, error);

export const mileageApprovalGetAllDispose = () =>
  action(MileageApprovalAction.GET_ALL_DISPOSE);

// get by id
export const mileageApprovalGetByIdRequest = (
  request: IMileageApprovalGetByIdRequest
) => action(MileageApprovalAction.GET_BY_ID_REQUEST, request);

export const mileageApprovalGetByIdSuccess = (
  response: IResponseSingle<IMileageRequestDetail>
) => action(MileageApprovalAction.GET_BY_ID_SUCCESS, response);

export const mileageApprovalGetByIdError = (error: any) =>
  action(MileageApprovalAction.GET_BY_ID_ERROR, error);

export const mileageApprovalGetByIdDispose = () =>
  action(MileageApprovalAction.GET_BY_ID_DISPOSE);

// post
export const mileageApprovalPostRequest = (request: IMileageApprovalPostRequest) => action(MileageApprovalAction.POST_REQUEST, request);
export const mileageApprovalPostSuccess = (response: IResponseSingle<IMileageRequest>) => action(MileageApprovalAction.POST_SUCCESS, response);
export const mileageApprovalPostError = (error: string) => action(MileageApprovalAction.POST_ERROR, error);
export const mileageApprovalPostDispose = () => action(MileageApprovalAction.POST_DISPOSE);
