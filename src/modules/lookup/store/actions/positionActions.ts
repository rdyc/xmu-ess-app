import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IPositionDeleteRequest, IPositionGetAllRequest, IPositionGetByIdRequest, IPositionGetListRequest, IPositionPostRequest, IPositionPutRequest } from '@lookup/classes/queries';
import { IPosition, IPositionDetail, IPositionList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum PositionAction {
  GET_ALL_REQUEST = '@@position/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@position/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@position/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@position/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@position/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@position/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@position/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@position/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@position/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@position/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@position/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@position/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@position/POST_REQUEST',
  POST_SUCCESS = '@@position/POST_SUCCESS',
  POST_ERROR = '@@position/POST_ERROR',
  POST_DISPOSE = '@@position/POST_DISPOSE',
  PUT_REQUEST = '@@position/PUT_REQUEST',
  PUT_SUCCESS = '@@position/PUT_SUCCESS',
  PUT_ERROR = '@@position/PUT_ERROR',
  PUT_DISPOSE = '@@position/PUT_DISPOSE',
  DELETE_REQUEST = '@@position/DELETE_REQUEST',
  DELETE_SUCCESS = '@@position/DELETE_SUCCESS',
  DELETE_ERROR = '@@position/DELETE_ERROR',
  DELETE_DISPOSE = '@@position/DELETE_DISPOSE',
}

// get all
export const positionGetAllRequest = (request: IPositionGetAllRequest) => action(PositionAction.GET_ALL_REQUEST, request);
export const positionGetAllSuccess = (response: IResponseCollection<IPosition>) => action(PositionAction.GET_ALL_SUCCESS, response);
export const positionGetAllError = (error: any) => action(PositionAction.GET_ALL_ERROR, error);
export const positionGetAllDispose = () => action(PositionAction.GET_ALL_DISPOSE);

// get list
export const positionGetListRequest = (request: IPositionGetListRequest) => action(PositionAction.GET_LIST_REQUEST, request);
export const positionGetListSuccess = (response: IResponseCollection<IPositionList>) => action(PositionAction.GET_LIST_SUCCESS, response);
export const positionGetListError = (error: any) => action(PositionAction.GET_LIST_ERROR, error);
export const positionGetListDispose = () => action(PositionAction.GET_LIST_DISPOSE);

// get by id
export const positionGetByIdRequest = (request: IPositionGetByIdRequest) => action(PositionAction.GET_BY_ID_REQUEST, request);
export const positionGetByIdSuccess = (response: IResponseCollection<IPositionDetail>) => action(PositionAction.GET_BY_ID_SUCCESS, response);
export const positionGetByIdError = (error: any) => action(PositionAction.GET_BY_ID_ERROR, error);
export const positionGetByIdDispose = () => action(PositionAction.GET_BY_ID_DISPOSE);

// post
export const positionPostRequest = (request: IPositionPostRequest) => action(PositionAction.POST_REQUEST, request);
export const positionPostSuccess = (response: IResponseSingle<IPosition>) => action(PositionAction.POST_SUCCESS, response);
export const positionPostError = (error: any) => action(PositionAction.POST_ERROR, error);
export const positionPostDispose = () => action(PositionAction.POST_DISPOSE);

// put
export const positionPutRequest = (request: IPositionPutRequest) => action(PositionAction.PUT_REQUEST, request);
export const positionPutSuccess = (response: IResponseSingle<IPosition>) => action(PositionAction.PUT_SUCCESS, response);
export const positionPutError = (error: any) => action(PositionAction.PUT_ERROR, error);
export const positionPutDispose = () => action(PositionAction.PUT_DISPOSE);

export const positionDeleteRequest = (request: IPositionDeleteRequest) => action(PositionAction.DELETE_REQUEST, request);
export const positionDeleteSuccess = (response: boolean) => action(PositionAction.DELETE_SUCCESS, response);
export const positionDeleteError = (error: any) => action(PositionAction.DELETE_ERROR, error);
export const positionDeleteDispose = () => action(PositionAction.DELETE_DISPOSE);