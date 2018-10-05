import { IResponseCollection } from '@generic/interfaces';
import { IPositionAllRequest, IPositionByIdRequest, IPositionListRequest } from '@lookup/classes/queries';
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
}

// get all
export const positionGetAllRequest = (request: IPositionAllRequest) => action(PositionAction.GET_ALL_REQUEST, request);
export const positionGetAllSuccess = (response: IResponseCollection<IPosition>) => action(PositionAction.GET_ALL_SUCCESS, response);
export const positionGetAllError = (message: string) => action(PositionAction.GET_ALL_ERROR, message);
export const positionGetAllDispose = () => action(PositionAction.GET_ALL_DISPOSE);

// get list
export const positionGetListRequest = (request: IPositionListRequest) => action(PositionAction.GET_LIST_REQUEST, request);
export const positionGetListSuccess = (response: IResponseCollection<IPositionList>) => action(PositionAction.GET_LIST_SUCCESS, response);
export const positionGetListError = (message: string) => action(PositionAction.GET_LIST_ERROR, message);
export const positionGetListDispose = () => action(PositionAction.GET_LIST_DISPOSE);

// get by id
export const positionGetByIdRequest = (request: IPositionByIdRequest) => action(PositionAction.GET_BY_ID_REQUEST, request);
export const positionGetByIdSuccess = (response: IResponseCollection<IPositionDetail>) => action(PositionAction.GET_BY_ID_SUCCESS, response);
export const positionGetByIdError = (message: string) => action(PositionAction.GET_BY_ID_ERROR, message);
export const positionGetByIdDispose = () => action(PositionAction.GET_BY_ID_DISPOSE);