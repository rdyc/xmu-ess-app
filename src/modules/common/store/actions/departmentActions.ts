import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum DepartmentAction {
  GET_ALL_REQUEST = '@@system/department/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/department/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/department/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/department/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/department/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/department/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/department/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/department/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/department/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/department/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/department/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/department/GET_BY_ID_DISPOSE',
}

// get all
export const departmentGetAllRequest = (request: ISystemAllRequest) => action(DepartmentAction.GET_ALL_REQUEST, request);
export const departmentGetAllSuccess = (response: IResponseCollection<ISystem>) => action(DepartmentAction.GET_ALL_SUCCESS, response);
export const departmentGetAllError = (message: string) => action(DepartmentAction.GET_ALL_ERROR, message);
export const departmentGetAllDispose = () => action(DepartmentAction.GET_ALL_DISPOSE);

// get list
export const departmentGetListRequest = (request: ISystemListRequest) => action(DepartmentAction.GET_LIST_REQUEST, request);
export const departmentGetListSuccess = (response: IResponseCollection<ISystemList>) => action(DepartmentAction.GET_LIST_SUCCESS, response);
export const departmentGetListError = (message: string) => action(DepartmentAction.GET_LIST_ERROR, message);
export const departmentGetListDispose = () => action(DepartmentAction.GET_LIST_DISPOSE);

// get by id
export const departmentGetByIdRequest = (request: ISystemByIdRequest) => action(DepartmentAction.GET_BY_ID_REQUEST, request);
export const departmentGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(DepartmentAction.GET_BY_ID_SUCCESS, response);
export const departmentGetByIdError = (message: string) => action(DepartmentAction.GET_BY_ID_ERROR, message);
export const departmentGetByIdDispose = () => action(DepartmentAction.GET_BY_ID_DISPOSE);