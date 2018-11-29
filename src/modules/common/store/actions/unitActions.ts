import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum UnitAction {
  GET_ALL_REQUEST = '@@system/unit/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/unit/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/unit/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/unit/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/unit/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/unit/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/unit/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/unit/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/unit/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/unit/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/unit/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/unit/GET_BY_ID_DISPOSE',
}

// get all
export const unitGetAllRequest = (request: ISystemAllRequest) => action(UnitAction.GET_ALL_REQUEST, request);
export const unitGetAllSuccess = (response: IResponseCollection<ISystem>) => action(UnitAction.GET_ALL_SUCCESS, response);
export const unitGetAllError = (message: string) => action(UnitAction.GET_ALL_ERROR, message);
export const unitGetAllDispose = () => action(UnitAction.GET_ALL_DISPOSE);

// get list
export const unitGetListRequest = (request: ISystemListRequest) => action(UnitAction.GET_LIST_REQUEST, request);
export const unitGetListSuccess = (response: IResponseCollection<ISystemList>) => action(UnitAction.GET_LIST_SUCCESS, response);
export const unitGetListError = (message: string) => action(UnitAction.GET_LIST_ERROR, message);
export const unitGetListDispose = () => action(UnitAction.GET_LIST_DISPOSE);

// get by id
export const unitGetByIdRequest = (request: ISystemByIdRequest) => action(UnitAction.GET_BY_ID_REQUEST, request);
export const unitGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(UnitAction.GET_BY_ID_SUCCESS, response);
export const unitGetByIdError = (message: string) => action(UnitAction.GET_BY_ID_ERROR, message);
export const unitGetByIdDispose = () => action(UnitAction.GET_BY_ID_DISPOSE);