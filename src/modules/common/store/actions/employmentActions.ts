import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum EmploymentAction {
  GET_ALL_REQUEST = '@@system/employment/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/employment/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/employment/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/employment/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/employment/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/employment/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/employment/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/employment/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/employment/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/employment/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/employment/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/employment/GET_BY_ID_DISPOSE',
}

// get all
export const employmentGetAllRequest = (request: ISystemAllRequest) => action(EmploymentAction.GET_ALL_REQUEST, request);
export const employmentGetAllSuccess = (response: IResponseCollection<ISystem>) => action(EmploymentAction.GET_ALL_SUCCESS, response);
export const employmentGetAllError = (error: any) => action(EmploymentAction.GET_ALL_ERROR, error);
export const employmentGetAllDispose = () => action(EmploymentAction.GET_ALL_DISPOSE);

// get list
export const employmentGetListRequest = (request: ISystemListRequest) => action(EmploymentAction.GET_LIST_REQUEST, request);
export const employmentGetListSuccess = (response: IResponseCollection<ISystemList>) => action(EmploymentAction.GET_LIST_SUCCESS, response);
export const employmentGetListError = (error: any) => action(EmploymentAction.GET_LIST_ERROR, error);
export const employmentGetListDispose = () => action(EmploymentAction.GET_LIST_DISPOSE);

// get by id
export const employmentGetByIdRequest = (request: ISystemByIdRequest) => action(EmploymentAction.GET_BY_ID_REQUEST, request);
export const employmentGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(EmploymentAction.GET_BY_ID_SUCCESS, response);
export const employmentGetByIdError = (error: any) => action(EmploymentAction.GET_BY_ID_ERROR, error);
export const employmentGetByIdDispose = () => action(EmploymentAction.GET_BY_ID_DISPOSE);