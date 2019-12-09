import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ITravelGetAllowedRequest,
  ITravelGetAllRequest,
  ITravelGetByIdRequest,
  ITravelPostRequest,
  ITravelPutRequest,
} from '@travel/classes/queries';
import { ITravelAllowedCreate, ITravelRequest, ITravelRequestDetail } from '@travel/classes/response';
import { action } from 'typesafe-actions';

export const enum TravelAction {
  GET_ALL_REQUEST = '@@travel/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@travel/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@travel/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@travel/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@travel/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@travel/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@travel/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@travel/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@travel/POST_REQUEST',
  POST_SUCCESS = '@@travel/POST_SUCCESS',
  POST_ERROR = '@@travel/POST_ERROR',
  POST_DISPOSE = '@@travel/POST_DISPOSE',
  PUT_REQUEST = '@@travel/PUT_REQUEST',
  PUT_SUCCESS = '@@travel/PUT_SUCCESS',
  PUT_ERROR = '@@travel/PUT_ERROR',
  PUT_DISPOSE = '@@travel/PUT_DISPOSE',
  GET_ALLOWED_REQUEST = '@@travel/GET_ALLOWED_REQUEST',
  GET_ALLOWED_SUCCESS = '@@travel/GET_ALLOWED_SUCCESS',
  GET_ALLOWED_ERROR = '@@travel/GET_ALLOWED_ERROR',
  GET_ALLOWED_DISPOSE = '@@travel/GET_ALLOWED_DISPOSE',
}

// get all travelrequest
export const travelGetAllRequest = (request: ITravelGetAllRequest) => action(TravelAction.GET_ALL_REQUEST, request);
export const travelGetAllSuccess = (response: IResponseCollection<ITravelRequest>) => action(TravelAction.GET_ALL_SUCCESS, response);
export const travelGetAllError = (error: any) => action(TravelAction.GET_ALL_ERROR, error);
export const travelGetAllDispose = () => action(TravelAction.GET_ALL_DISPOSE);

// get request by id
export const travelGetByIdRequest = (request: ITravelGetByIdRequest) => action(TravelAction.GET_BY_ID_REQUEST, request);
export const travelGetByIdSuccess = (response: IResponseSingle<ITravelRequestDetail>) => action(TravelAction.GET_BY_ID_SUCCESS, response);
export const travelGetByIdError = (error: any) => action(TravelAction.GET_BY_ID_ERROR, error);
export const travelGetByIdDispose = () => action(TravelAction.GET_BY_ID_DISPOSE);

// post
export const travelPostRequest = (request: ITravelPostRequest) => action(TravelAction.POST_REQUEST, request);
export const travelPostSuccess = (response: IResponseSingle<ITravelRequest>) => action(TravelAction.POST_SUCCESS, response);
export const travelPostError = (error: any) => action(TravelAction.POST_ERROR, error);
export const travelPostDispose = () => action(TravelAction.POST_DISPOSE);

// put
export const travelPutRequest = (request: ITravelPutRequest) => action(TravelAction.PUT_REQUEST, request);
export const travelPutSuccess = (response: IResponseSingle<ITravelRequest>) => action(TravelAction.PUT_SUCCESS, response);
export const travelPutError = (error: any) => action(TravelAction.PUT_ERROR, error);
export const travelPutDispose = () => action(TravelAction.PUT_DISPOSE);

// get request by id
export const travelGetAllowedRequest = (request: ITravelGetAllowedRequest) => action(TravelAction.GET_ALLOWED_REQUEST, request);
export const travelGetAllowedSuccess = (response: IResponseSingle<ITravelAllowedCreate>) => action(TravelAction.GET_ALLOWED_SUCCESS, response);
export const travelGetAllowedError = (error: any) => action(TravelAction.GET_ALLOWED_ERROR, error);
export const travelGetAllowedDispose = () => action(TravelAction.GET_ALLOWED_DISPOSE);
