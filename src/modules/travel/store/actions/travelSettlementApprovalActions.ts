import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ITravelSettlementApprovalGetAllRequest,
  ITravelSettlementApprovalGetByIdRequest,
  ITravelSettlementApprovalPostRequest,
} from '@travel/classes/queries/settlementApproval';
import { ITravelSettlement, ITravelSettlementDetail } from '@travel/classes/response';
import { action } from 'typesafe-actions';

export const enum TravelSettlementApprovalAction {
  GET_ALL_REQUEST = '@@travel/settlement/approval/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@travel/settlement/approval/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@travel/settlement/approval/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@travel/settlement/approval/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@travel/settlement/approval/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@travel/settlement/approval/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@travel/settlement/approval/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@travel/settlement/approval/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@travel/settlement/approval/POST_REQUEST',
  POST_SUCCESS = '@@travel/settlement/approval/POST_SUCCESS',
  POST_ERROR = '@@travel/settlement/approval/POST_ERROR',
  POST_DISPOSE = '@@travel/settlement/approval/POST_DISPOSE',
  PUT_REQUEST = '@@travel/settlement/approval/PUT_REQUEST',
  PUT_SUCCESS = '@@travel/settlement/approval/PUT_SUCCESS',
  PUT_ERROR = '@@travel/settlement/approval/PUT_ERROR',
  PUT_DISPOSE = '@@travel/settlement/approval/PUT_DISPOSE',
}

// get all travelApproval
export const travelSettlementApprovalGetAllRequest = (request: ITravelSettlementApprovalGetAllRequest) => action(TravelSettlementApprovalAction.GET_ALL_REQUEST, request);
export const travelSettlementApprovalGetAllSuccess = (response: IResponseCollection<ITravelSettlement>) => action(TravelSettlementApprovalAction.GET_ALL_SUCCESS, response);
export const travelSettlementApprovalGetAllError = (error: any) => action(TravelSettlementApprovalAction.GET_ALL_ERROR, error);
export const travelSettlementApprovalGetAllDispose = () => action(TravelSettlementApprovalAction.GET_ALL_DISPOSE);

// get request by id
export const travelSettlementApprovalGetByIdRequest = (request: ITravelSettlementApprovalGetByIdRequest) => action(TravelSettlementApprovalAction.GET_BY_ID_REQUEST, request);
export const travelSettlementApprovalGetByIdSuccess = (response: IResponseSingle<ITravelSettlementDetail>) => action(TravelSettlementApprovalAction.GET_BY_ID_SUCCESS, response);
export const travelSettlementApprovalGetByIdError = (error: any) => action(TravelSettlementApprovalAction.GET_BY_ID_ERROR, error);
export const travelSettlementApprovalGetByIdDispose = () => action(TravelSettlementApprovalAction.GET_BY_ID_DISPOSE);

// post
export const travelSettlementApprovalPostRequest = (request: ITravelSettlementApprovalPostRequest) => action(TravelSettlementApprovalAction.POST_REQUEST, request);
export const travelSettlementApprovalPostSuccess = (response: IResponseSingle<ITravelSettlement>) => action(TravelSettlementApprovalAction.POST_SUCCESS, response);
export const travelSettlementApprovalPostError = (error: any) => action(TravelSettlementApprovalAction.POST_ERROR, error);
export const travelSettlementApprovalPostDispose = () => action(TravelSettlementApprovalAction.POST_DISPOSE);
