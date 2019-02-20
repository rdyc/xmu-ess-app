import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum TransportationAction {
  GET_ALL_REQUEST = '@@system/transportation/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/transportation/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/transportation/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/transportation/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/transportation/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/transportation/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/transportation/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/transportation/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/transportation/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/transportation/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/transportation/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/transportation/GET_BY_ID_DISPOSE',
}

// get all
export const transportationGetAllRequest = (request: ISystemAllRequest) => action(TransportationAction.GET_ALL_REQUEST, request);
export const transportationGetAllSuccess = (response: IResponseCollection<ISystem>) => action(TransportationAction.GET_ALL_SUCCESS, response);
export const transportationGetAllError = (error: any) => action(TransportationAction.GET_ALL_ERROR, error);
export const transportationGetAllDispose = () => action(TransportationAction.GET_ALL_DISPOSE);

// get list
export const transportationGetListRequest = (request: ISystemListRequest) => action(TransportationAction.GET_LIST_REQUEST, request);
export const transportationGetListSuccess = (response: IResponseCollection<ISystemList>) => action(TransportationAction.GET_LIST_SUCCESS, response);
export const transportationGetListError = (error: any) => action(TransportationAction.GET_LIST_ERROR, error);
export const transportationGetListDispose = () => action(TransportationAction.GET_LIST_DISPOSE);

// get by id
export const transportationGetByIdRequest = (request: ISystemByIdRequest) => action(TransportationAction.GET_BY_ID_REQUEST, request);
export const transportationGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(TransportationAction.GET_BY_ID_SUCCESS, response);
export const transportationGetByIdError = (error: any) => action(TransportationAction.GET_BY_ID_ERROR, error);
export const transportationGetByIdDispose = () => action(TransportationAction.GET_BY_ID_DISPOSE);