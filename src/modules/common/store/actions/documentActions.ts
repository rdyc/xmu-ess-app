import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum DocumentAction {
  GET_ALL_REQUEST = '@@system/document/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/document/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/document/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/document/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/document/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/document/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/document/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/document/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/document/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/document/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/document/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/document/GET_BY_ID_DISPOSE',
}

// get all
export const documentGetAllRequest = (request: ISystemAllRequest) => action(DocumentAction.GET_ALL_REQUEST, request);
export const documentGetAllSuccess = (response: IResponseCollection<ISystem>) => action(DocumentAction.GET_ALL_SUCCESS, response);
export const documentGetAllError = (message: string) => action(DocumentAction.GET_ALL_ERROR, message);
export const documentGetAllDispose = () => action(DocumentAction.GET_ALL_DISPOSE);

// get list
export const documentGetListRequest = (request: ISystemListRequest) => action(DocumentAction.GET_LIST_REQUEST, request);
export const documentGetListSuccess = (response: IResponseCollection<ISystemList>) => action(DocumentAction.GET_LIST_SUCCESS, response);
export const documentGetListError = (message: string) => action(DocumentAction.GET_LIST_ERROR, message);
export const documentGetListDispose = () => action(DocumentAction.GET_LIST_DISPOSE);

// get by id
export const documentGetByIdRequest = (request: ISystemByIdRequest) => action(DocumentAction.GET_BY_ID_REQUEST, request);
export const documentGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(DocumentAction.GET_BY_ID_SUCCESS, response);
export const documentGetByIdError = (message: string) => action(DocumentAction.GET_BY_ID_ERROR, message);
export const documentGetByIdDispose = () => action(DocumentAction.GET_BY_ID_DISPOSE);