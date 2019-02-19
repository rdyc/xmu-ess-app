import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum LimiterAction {
  GET_ALL_REQUEST = '@@system/limiter/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/limiter/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/limiter/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/limiter/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/limiter/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/limiter/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/limiter/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/limiter/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/limiter/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/limiter/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/limiter/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/limiter/GET_BY_ID_DISPOSE',
}

// get all
export const limiterGetAllRequest = (request: ISystemAllRequest) => action(LimiterAction.GET_ALL_REQUEST, request);
export const limiterGetAllSuccess = (response: IResponseCollection<ISystem>) => action(LimiterAction.GET_ALL_SUCCESS, response);
export const limiterGetAllError = (error: any) => action(LimiterAction.GET_ALL_ERROR, error);
export const limiterGetAllDispose = () => action(LimiterAction.GET_ALL_DISPOSE);

// get list
export const limiterGetListRequest = (request: ISystemListRequest) => action(LimiterAction.GET_LIST_REQUEST, request);
export const limiterGetListSuccess = (response: IResponseCollection<ISystemList>) => action(LimiterAction.GET_LIST_SUCCESS, response);
export const limiterGetListError = (error: any) => action(LimiterAction.GET_LIST_ERROR, error);
export const limiterGetListDispose = () => action(LimiterAction.GET_LIST_DISPOSE);

// get by id
export const limiterGetByIdRequest = (request: ISystemByIdRequest) => action(LimiterAction.GET_BY_ID_REQUEST, request);
export const limiterGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(LimiterAction.GET_BY_ID_SUCCESS, response);
export const limiterGetByIdError = (error: any) => action(LimiterAction.GET_BY_ID_ERROR, error);
export const limiterGetByIdDispose = () => action(LimiterAction.GET_BY_ID_DISPOSE);