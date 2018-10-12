import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum DocumentPresalesAction {
  GET_ALL_REQUEST = '@@system/documentPresales/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/documentPresales/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/documentPresales/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/documentPresales/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/documentPresales/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/documentPresales/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/documentPresales/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/documentPresales/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/documentPresales/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/documentPresales/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/documentPresales/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/documentPresales/GET_BY_ID_DISPOSE',
}

// get all
export const documentPresalesGetAllRequest = (request: ISystemAllRequest) => action(DocumentPresalesAction.GET_ALL_REQUEST, request);
export const documentPresalesGetAllSuccess = (response: IResponseCollection<ISystem>) => action(DocumentPresalesAction.GET_ALL_SUCCESS, response);
export const documentPresalesGetAllError = (message: string) => action(DocumentPresalesAction.GET_ALL_ERROR, message);
export const documentPresalesGetAllDispose = () => action(DocumentPresalesAction.GET_ALL_DISPOSE);

// get list
export const documentPresalesGetListRequest = (request: ISystemListRequest) => action(DocumentPresalesAction.GET_LIST_REQUEST, request);
export const documentPresalesGetListSuccess = (response: IResponseCollection<ISystemList>) => action(DocumentPresalesAction.GET_LIST_SUCCESS, response);
export const documentPresalesGetListError = (message: string) => action(DocumentPresalesAction.GET_LIST_ERROR, message);
export const documentPresalesGetListDispose = () => action(DocumentPresalesAction.GET_LIST_DISPOSE);

// get by id
export const documentPresalesGetByIdRequest = (request: ISystemByIdRequest) => action(DocumentPresalesAction.GET_BY_ID_REQUEST, request);
export const documentPresalesGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(DocumentPresalesAction.GET_BY_ID_SUCCESS, response);
export const documentPresalesGetByIdError = (message: string) => action(DocumentPresalesAction.GET_BY_ID_ERROR, message);
export const documentPresalesGetByIdDispose = () => action(DocumentPresalesAction.GET_BY_ID_DISPOSE);