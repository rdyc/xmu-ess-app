import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ITravelGetByIdRequest,
  ITravelSettlementGetAllRequest,
  ITravelSettlementPostRequest,
  ITravelSettlementPutRequest,
} from '@travel/classes/queries';
import { ITravelRequestDetail, ITravelSettlement } from '@travel/classes/response';
import { action } from 'typesafe-actions';

export const enum TravelSettlementAction {
  GET_ALL_REQUEST = '@@travelSettlement/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@travelSettlement/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@travelSettlement/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@travelSettlement/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@travelSettlement/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@travelSettlement/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@travelSettlement/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@travelSettlement/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@travelSettlement/POST_REQUEST',
  POST_SUCCESS = '@@travelSettlement/POST_SUCCESS',
  POST_ERROR = '@@travelSettlement/POST_ERROR',
  POST_DISPOSE = '@@travelSettlement/POST_DISPOSE',
  PUT_REQUEST = '@@travelSettlement/PUT_REQUEST',
  PUT_SUCCESS = '@@travelSettlement/PUT_SUCCESS',
  PUT_ERROR = '@@travelSettlement/PUT_ERROR',
  PUT_DISPOSE = '@@travelSettlement/PUT_DISPOSE',
}

// get all
export const travelSettlementGetAllRequest = (request: ITravelSettlementGetAllRequest) => action(TravelSettlementAction.GET_ALL_REQUEST, request);
export const travelSettlementGetAllSuccess = (response: IResponseCollection<ITravelSettlement>) => action(TravelSettlementAction.GET_ALL_SUCCESS, response);
export const travelSettlementGetAllError = (message: string) => action(TravelSettlementAction.GET_ALL_ERROR, message);
export const travelSettlementGetAllDispose = () => action(TravelSettlementAction.GET_ALL_DISPOSE);

// get by id
export const travelSettlementGetByIdRequest = (request: ITravelGetByIdRequest) => action(TravelSettlementAction.GET_BY_ID_REQUEST, request);
export const travelSettlementGetByIdSuccess = (response: IResponseSingle<ITravelRequestDetail>) => action(TravelSettlementAction.GET_BY_ID_SUCCESS, response);
export const travelSettlementGetByIdError = (message: string) => action(TravelSettlementAction.GET_BY_ID_ERROR, message);
export const travelSettlementGetByIdDispose = () => action(TravelSettlementAction.GET_BY_ID_DISPOSE);

// post
export const travelSettlementPostRequest = (request: ITravelSettlementPostRequest) => action(TravelSettlementAction.POST_REQUEST, request);
export const travelSettlementPostSuccess = (response: IResponseSingle<ITravelSettlement>) => action(TravelSettlementAction.POST_SUCCESS, response);
export const travelSettlementPostError = (message: string) => action(TravelSettlementAction.POST_ERROR, message);
export const travelSettlementPostDispose = () => action(TravelSettlementAction.POST_DISPOSE);

// put
export const travelSettlementPutRequest = (request: ITravelSettlementPutRequest) => action(TravelSettlementAction.PUT_REQUEST, request);
export const travelSettlementPutSuccess = (response: IResponseSingle<ITravelSettlement>) => action(TravelSettlementAction.PUT_SUCCESS, response);
export const travelSettlementPutError = (message: string) => action(TravelSettlementAction.PUT_ERROR, message);
export const travelSettlementPutDispose = () => action(TravelSettlementAction.PUT_DISPOSE);