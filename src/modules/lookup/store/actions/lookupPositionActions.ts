import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IPositionDeleteRequest, IPositionGetAllRequest, IPositionGetByIdRequest, IPositionGetListRequest, IPositionPostRequest, IPositionPutRequest } from '@lookup/classes/queries';
import { IPosition, IPositionDetail, IPositionList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupPositionAction {
  GET_ALL_REQUEST = '@@lookup/position/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/position/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/position/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/position/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/position/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/position/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/position/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/position/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/position/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/position/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/position/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/position/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/position/POST_REQUEST',
  POST_SUCCESS = '@@lookup/position/POST_SUCCESS',
  POST_ERROR = '@@lookup/position/POST_ERROR',
  POST_DISPOSE = '@@lookup/position/POST_DISPOSE',
  PUT_REQUEST = '@@lookup/position/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/position/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/osition/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/position/PUT_DISPOSE',
  DELETE_REQUEST = '@@lookup/position/DELETE_REQUEST',
  DELETE_SUCCESS = '@@lookup/position/DELETE_SUCCESS',
  DELETE_ERROR = '@@lookup/position/DELETE_ERROR',
  DELETE_DISPOSE = '@@lookup/position/DELETE_DISPOSE',
}

// get all
export const lookupPositionGetAllRequest = (request: IPositionGetAllRequest) => action(LookupPositionAction.GET_ALL_REQUEST, request);
export const lookupPositionGetAllSuccess = (response: IResponseCollection<IPosition>) => action(LookupPositionAction.GET_ALL_SUCCESS, response);
export const lookupPositionGetAllError = (error: any) => action(LookupPositionAction.GET_ALL_ERROR, error);
export const lookupPositionGetAllDispose = () => action(LookupPositionAction.GET_ALL_DISPOSE);

// get list
export const lookupPositionGetListRequest = (request: IPositionGetListRequest) => action(LookupPositionAction.GET_LIST_REQUEST, request);
export const lookupPositionGetListSuccess = (response: IResponseCollection<IPositionList>) => action(LookupPositionAction.GET_LIST_SUCCESS, response);
export const lookupPositionGetListError = (error: any) => action(LookupPositionAction.GET_LIST_ERROR, error);
export const lookupPositionGetListDispose = () => action(LookupPositionAction.GET_LIST_DISPOSE);

// get by id
export const lookupPositionGetByIdRequest = (request: IPositionGetByIdRequest) => action(LookupPositionAction.GET_BY_ID_REQUEST, request);
export const lookupPositionGetByIdSuccess = (response: IResponseCollection<IPositionDetail>) => action(LookupPositionAction.GET_BY_ID_SUCCESS, response);
export const lookupPositionGetByIdError = (error: any) => action(LookupPositionAction.GET_BY_ID_ERROR, error);
export const lookupPositionGetByIdDispose = () => action(LookupPositionAction.GET_BY_ID_DISPOSE);

// post
export const lookupPositionPostRequest = (request: IPositionPostRequest) => action(LookupPositionAction.POST_REQUEST, request);
export const lookupPositionPostSuccess = (response: IResponseSingle<IPosition>) => action(LookupPositionAction.POST_SUCCESS, response);
export const lookupPositionPostError = (error: any) => action(LookupPositionAction.POST_ERROR, error);
export const lookupPositionPostDispose = () => action(LookupPositionAction.POST_DISPOSE);

// put
export const lookupPositionPutRequest = (request: IPositionPutRequest) => action(LookupPositionAction.PUT_REQUEST, request);
export const lookupPositionPutSuccess = (response: IResponseSingle<IPosition>) => action(LookupPositionAction.PUT_SUCCESS, response);
export const lookupPositionPutError = (error: any) => action(LookupPositionAction.PUT_ERROR, error);
export const lookupPositionPutDispose = () => action(LookupPositionAction.PUT_DISPOSE);

export const lookupPositionDeleteRequest = (request: IPositionDeleteRequest) => action(LookupPositionAction.DELETE_REQUEST, request);
export const lookupPositionDeleteSuccess = (response: boolean) => action(LookupPositionAction.DELETE_SUCCESS, response);
export const lookupPositionDeleteError = (error: any) => action(LookupPositionAction.DELETE_ERROR, error);
export const lookupPositionDeleteDispose = () => action(LookupPositionAction.DELETE_DISPOSE);