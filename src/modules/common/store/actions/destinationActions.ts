import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum DestinationAction {
  GET_ALL_REQUEST = '@@system/destination/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/destination/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/destination/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/destination/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/destination/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/destination/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/destination/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/destination/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/destination/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/destination/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/destination/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/destination/GET_BY_ID_DISPOSE',
}

// get all
export const destinationGetAllRequest = (request: ISystemAllRequest) => action(DestinationAction.GET_ALL_REQUEST, request);
export const destinationGetAllSuccess = (response: IResponseCollection<ISystem>) => action(DestinationAction.GET_ALL_SUCCESS, response);
export const destinationGetAllError = (message: string) => action(DestinationAction.GET_ALL_ERROR, message);
export const destinationGetAllDispose = () => action(DestinationAction.GET_ALL_DISPOSE);

// get list
export const destinationGetListRequest = (request: ISystemListRequest) => action(DestinationAction.GET_LIST_REQUEST, request);
export const destinationGetListSuccess = (response: IResponseCollection<ISystemList>) => action(DestinationAction.GET_LIST_SUCCESS, response);
export const destinationGetListError = (message: string) => action(DestinationAction.GET_LIST_ERROR, message);
export const destinationGetListDispose = () => action(DestinationAction.GET_LIST_DISPOSE);

// get by id
export const destinationGetByIdRequest = (request: ISystemByIdRequest) => action(DestinationAction.GET_BY_ID_REQUEST, request);
export const destinationGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(DestinationAction.GET_BY_ID_SUCCESS, response);
export const destinationGetByIdError = (message: string) => action(DestinationAction.GET_BY_ID_ERROR, message);
export const destinationGetByIdDispose = () => action(DestinationAction.GET_BY_ID_DISPOSE);