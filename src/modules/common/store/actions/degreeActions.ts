import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum DegreeAction {
  GET_ALL_REQUEST = '@@system/degree/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/degree/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/degree/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/degree/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/degree/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/degree/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/degree/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/degree/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/degree/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/degree/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/degree/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/degree/GET_BY_ID_DISPOSE',
}

// get all
export const degreeGetAllRequest = (request: ISystemAllRequest) => action(DegreeAction.GET_ALL_REQUEST, request);
export const degreeGetAllSuccess = (response: IResponseCollection<ISystem>) => action(DegreeAction.GET_ALL_SUCCESS, response);
export const degreeGetAllError = (message: string) => action(DegreeAction.GET_ALL_ERROR, message);
export const degreeGetAllDispose = () => action(DegreeAction.GET_ALL_DISPOSE);

// get list
export const degreeGetListRequest = (request: ISystemListRequest) => action(DegreeAction.GET_LIST_REQUEST, request);
export const degreeGetListSuccess = (response: IResponseCollection<ISystemList>) => action(DegreeAction.GET_LIST_SUCCESS, response);
export const degreeGetListError = (message: string) => action(DegreeAction.GET_LIST_ERROR, message);
export const degreeGetListDispose = () => action(DegreeAction.GET_LIST_DISPOSE);

// get by id
export const degreeGetByIdRequest = (request: ISystemByIdRequest) => action(DegreeAction.GET_BY_ID_REQUEST, request);
export const degreeGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(DegreeAction.GET_BY_ID_SUCCESS, response);
export const degreeGetByIdError = (message: string) => action(DegreeAction.GET_BY_ID_ERROR, message);
export const degreeGetByIdDispose = () => action(DegreeAction.GET_BY_ID_DISPOSE);