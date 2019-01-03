import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum TaxAction {
  GET_ALL_REQUEST = '@@system/tax/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/tax/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/tax/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/tax/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/tax/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/tax/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/tax/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/tax/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/tax/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/tax/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/tax/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/tax/GET_BY_ID_DISPOSE',
}

// get all
export const taxGetAllRequest = (request: ISystemAllRequest) => action(TaxAction.GET_ALL_REQUEST, request);
export const taxGetAllSuccess = (response: IResponseCollection<ISystem>) => action(TaxAction.GET_ALL_SUCCESS, response);
export const taxGetAllError = (message: string) => action(TaxAction.GET_ALL_ERROR, message);
export const taxGetAllDispose = () => action(TaxAction.GET_ALL_DISPOSE);

// get list
export const taxGetListRequest = (request: ISystemListRequest) => action(TaxAction.GET_LIST_REQUEST, request);
export const taxGetListSuccess = (response: IResponseCollection<ISystemList>) => action(TaxAction.GET_LIST_SUCCESS, response);
export const taxGetListError = (message: string) => action(TaxAction.GET_LIST_ERROR, message);
export const taxGetListDispose = () => action(TaxAction.GET_LIST_DISPOSE);

// get by id
export const taxGetByIdRequest = (request: ISystemByIdRequest) => action(TaxAction.GET_BY_ID_REQUEST, request);
export const taxGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(TaxAction.GET_BY_ID_SUCCESS, response);
export const taxGetByIdError = (message: string) => action(TaxAction.GET_BY_ID_ERROR, message);
export const taxGetByIdDispose = () => action(TaxAction.GET_BY_ID_DISPOSE);