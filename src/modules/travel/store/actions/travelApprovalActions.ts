import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ITravelApprovalGetAllRequest,
  ITravelApprovalGetByIdRequest,
  ITravelApprovalPostRequest,
} from '@travel/classes/queries/requestApproval';
import { ITravelRequest, ITravelRequestDetail } from '@travel/classes/response';
import { action } from 'typesafe-actions';

export const enum TravelApprovalAction {
  GET_ALL_REQUEST = '@@travel/approval/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@travel/approval/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@travel/approval/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@travel/approval/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@travel/approval/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@travel/approval/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@travel/approval/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@travel/approval/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@travel/approval/POST_REQUEST',
  POST_SUCCESS = '@@travel/approval/POST_SUCCESS',
  POST_ERROR = '@@travel/approval/POST_ERROR',
  POST_DISPOSE = '@@travel/approval/POST_DISPOSE',
  PUT_REQUEST = '@@travel/approval/PUT_REQUEST',
  PUT_SUCCESS = '@@travel/approval/PUT_SUCCESS',
  PUT_ERROR = '@@travel/approval/PUT_ERROR',
  PUT_DISPOSE = '@@travel/approval/PUT_DISPOSE',
}

// get all travelApproval
export const travelApprovalGetAllRequest = (request: ITravelApprovalGetAllRequest) => action(TravelApprovalAction.GET_ALL_REQUEST, request);
export const travelApprovalGetAllSuccess = (response: IResponseCollection<ITravelRequest>) => action(TravelApprovalAction.GET_ALL_SUCCESS, response);
export const travelApprovalGetAllError = (message: string) => action(TravelApprovalAction.GET_ALL_ERROR, message);
export const travelApprovalGetAllDispose = () => action(TravelApprovalAction.GET_ALL_DISPOSE);

// get request by id
export const travelApprovalGetByIdRequest = (request: ITravelApprovalGetByIdRequest) => action(TravelApprovalAction.GET_BY_ID_REQUEST, request);
export const travelApprovalGetByIdSuccess = (response: IResponseSingle<ITravelRequestDetail>) => action(TravelApprovalAction.GET_BY_ID_SUCCESS, response);
export const travelApprovalGetByIdError = (message: string) => action(TravelApprovalAction.GET_BY_ID_ERROR, message);
export const travelApprovalGetByIdDispose = () => action(TravelApprovalAction.GET_BY_ID_DISPOSE);

// post
export const travelApprovalPostRequest = (request: ITravelApprovalPostRequest) => action(TravelApprovalAction.POST_REQUEST, request);
export const travelApprovalPostSuccess = (response: IResponseSingle<ITravelRequest>) => action(TravelApprovalAction.POST_SUCCESS, response);
export const travelApprovalPostError = (message: string) => action(TravelApprovalAction.POST_ERROR, message);
export const travelApprovalPostDispose = () => action(TravelApprovalAction.POST_DISPOSE);
