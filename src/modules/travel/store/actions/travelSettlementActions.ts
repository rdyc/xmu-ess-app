import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ITravelSettlementGetAllRequest,
  ITravelSettlementGetByIdRequest,
  ITravelSettlementPostRequest,
  ITravelSettlementPutRequest,
} from '@travel/classes/queries/settlement';
import { ITravelSettlement, ITravelSettlementDetail } from '@travel/classes/response';
import { action } from 'typesafe-actions';

export const enum TravelSettlementAction {
  GET_ALL_REQUEST = '@@travel/settlement/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@travel/settlement/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@travel/settlement/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@travel/settlement/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@travel/settlement/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@travel/settlement/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@travel/settlement/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@travel/settlement/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@travel/settlement/POST_REQUEST',
  POST_SUCCESS = '@@travel/settlement/POST_SUCCESS',
  POST_ERROR = '@@travel/settlement/POST_ERROR',
  POST_DISPOSE = '@@travel/settlement/POST_DISPOSE',
  PUT_REQUEST = '@@travel/settlement/PUT_REQUEST',
  PUT_SUCCESS = '@@travel/settlement/PUT_SUCCESS',
  PUT_ERROR = '@@travel/settlement/PUT_ERROR',
  PUT_DISPOSE = '@@travel/settlement/PUT_DISPOSE',
}

// get all
export const travelSettlementGetAllRequest = (request: ITravelSettlementGetAllRequest) => action(TravelSettlementAction.GET_ALL_REQUEST, request);
export const travelSettlementGetAllSuccess = (response: IResponseCollection<ITravelSettlement>) => action(TravelSettlementAction.GET_ALL_SUCCESS, response);
export const travelSettlementGetAllError = (error: any) => action(TravelSettlementAction.GET_ALL_ERROR, error);
export const travelSettlementGetAllDispose = () => action(TravelSettlementAction.GET_ALL_DISPOSE);

// get by id
export const travelSettlementGetByIdRequest = (request: ITravelSettlementGetByIdRequest) => action(TravelSettlementAction.GET_BY_ID_REQUEST, request);
export const travelSettlementGetByIdSuccess = (response: IResponseSingle<ITravelSettlementDetail>) => action(TravelSettlementAction.GET_BY_ID_SUCCESS, response);
export const travelSettlementGetByIdError = (error: any) => action(TravelSettlementAction.GET_BY_ID_ERROR, error);
export const travelSettlementGetByIdDispose = () => action(TravelSettlementAction.GET_BY_ID_DISPOSE);

// post
export const travelSettlementPostRequest = (request: ITravelSettlementPostRequest) => action(TravelSettlementAction.POST_REQUEST, request);
export const travelSettlementPostSuccess = (response: IResponseSingle<ITravelSettlement>) => action(TravelSettlementAction.POST_SUCCESS, response);
export const travelSettlementPostError = (error: any) => action(TravelSettlementAction.POST_ERROR, error);
export const travelSettlementPostDispose = () => action(TravelSettlementAction.POST_DISPOSE);

// put
export const travelSettlementPutRequest = (request: ITravelSettlementPutRequest) => action(TravelSettlementAction.PUT_REQUEST, request);
export const travelSettlementPutSuccess = (response: IResponseSingle<ITravelSettlement>) => action(TravelSettlementAction.PUT_SUCCESS, response);
export const travelSettlementPutError = (error: any) => action(TravelSettlementAction.PUT_ERROR, error);
export const travelSettlementPutDispose = () => action(TravelSettlementAction.PUT_DISPOSE);