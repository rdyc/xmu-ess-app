import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum MeasurementAction {
  GET_ALL_REQUEST = '@@system/measurement/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/measurement/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/measurement/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/measurement/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/measurement/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/measurement/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/measurement/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/measurement/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/measurement/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/measurement/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/measurement/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/measurement/GET_BY_ID_DISPOSE',
}

// get all
export const measurementGetAllRequest = (request: ISystemAllRequest) => action(MeasurementAction.GET_ALL_REQUEST, request);
export const measurementGetAllSuccess = (response: IResponseCollection<ISystem>) => action(MeasurementAction.GET_ALL_SUCCESS, response);
export const measurementGetAllError = (error: any) => action(MeasurementAction.GET_ALL_ERROR, error);
export const measurementGetAllDispose = () => action(MeasurementAction.GET_ALL_DISPOSE);

// get list
export const measurementGetListRequest = (request: ISystemListRequest) => action(MeasurementAction.GET_LIST_REQUEST, request);
export const measurementGetListSuccess = (response: IResponseCollection<ISystemList>) => action(MeasurementAction.GET_LIST_SUCCESS, response);
export const measurementGetListError = (error: any) => action(MeasurementAction.GET_LIST_ERROR, error);
export const measurementGetListDispose = () => action(MeasurementAction.GET_LIST_DISPOSE);

// get by id
export const measurementGetByIdRequest = (request: ISystemByIdRequest) => action(MeasurementAction.GET_BY_ID_REQUEST, request);
export const measurementGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(MeasurementAction.GET_BY_ID_SUCCESS, response);
export const measurementGetByIdError = (error: any) => action(MeasurementAction.GET_BY_ID_ERROR, error);
export const measurementGetByIdDispose = () => action(MeasurementAction.GET_BY_ID_DISPOSE);