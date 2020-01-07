import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum KpiAction {
  GET_ALL_REQUEST = '@@system/kpi/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/kpi/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/kpi/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/kpi/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/kpi/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/kpi/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/kpi/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/kpi/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/kpi/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/kpi/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/kpi/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/kpi/GET_BY_ID_DISPOSE',
}

// get all
export const kpiGetAllRequest = (request: ISystemAllRequest) => action(KpiAction.GET_ALL_REQUEST, request);
export const kpiGetAllSuccess = (response: IResponseCollection<ISystem>) => action(KpiAction.GET_ALL_SUCCESS, response);
export const kpiGetAllError = (error: any) => action(KpiAction.GET_ALL_ERROR, error);
export const kpiGetAllDispose = () => action(KpiAction.GET_ALL_DISPOSE);

// get list
export const kpiGetListRequest = (request: ISystemListRequest) => action(KpiAction.GET_LIST_REQUEST, request);
export const kpiGetListSuccess = (response: IResponseCollection<ISystemList>) => action(KpiAction.GET_LIST_SUCCESS, response);
export const kpiGetListError = (error: any) => action(KpiAction.GET_LIST_ERROR, error);
export const kpiGetListDispose = () => action(KpiAction.GET_LIST_DISPOSE);

// get by id
export const kpiGetByIdRequest = (request: ISystemByIdRequest) => action(KpiAction.GET_BY_ID_REQUEST, request);
export const kpiGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(KpiAction.GET_BY_ID_SUCCESS, response);
export const kpiGetByIdError = (error: any) => action(KpiAction.GET_BY_ID_ERROR, error);
export const kpiGetByIdDispose = () => action(KpiAction.GET_BY_ID_DISPOSE);