import { IResponseCollection } from '@generic/interfaces';
import { ILookupCompanyAllRequest, ILookupCompanyByIdRequest, ILookupCompanyListRequest } from '@lookup/classes/queries/company';
import { ICompany, ICompanyDetail, ICompanyList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupCompanyAction {
  GET_ALL_REQUEST = '@@company/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@company/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@company/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@company/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@company/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@company/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@company/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@company/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@company/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@company/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@company/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@company/GET_BY_ID_DISPOSE',
}

// get all
export const lookupCompanyGetAllRequest = (request: ILookupCompanyAllRequest) => action(LookupCompanyAction.GET_ALL_REQUEST, request);
export const lookupCompanyGetAllSuccess = (response: IResponseCollection<ICompany>) => action(LookupCompanyAction.GET_ALL_SUCCESS, response);
export const lookupCompanyGetAllError = (message: string) => action(LookupCompanyAction.GET_ALL_ERROR, message);
export const lookupCompanyGetAllDispose = () => action(LookupCompanyAction.GET_ALL_DISPOSE);

// get list
export const lookupCompanyGetListRequest = (request: ILookupCompanyListRequest) => action(LookupCompanyAction.GET_LIST_REQUEST, request);
export const lookupCompanyGetListSuccess = (response: IResponseCollection<ICompanyList>) => action(LookupCompanyAction.GET_LIST_SUCCESS, response);
export const lookupCompanyGetListError = (message: string) => action(LookupCompanyAction.GET_LIST_ERROR, message);
export const lookupCompanyGetListDispose = () => action(LookupCompanyAction.GET_LIST_DISPOSE);

// get by id
export const lookupCompanyGetByIdRequest = (request: ILookupCompanyByIdRequest) => action(LookupCompanyAction.GET_BY_ID_REQUEST, request);
export const lookupCompanyGetByIdSuccess = (response: IResponseCollection<ICompanyDetail>) => action(LookupCompanyAction.GET_BY_ID_SUCCESS, response);
export const lookupCompanyGetByIdError = (message: string) => action(LookupCompanyAction.GET_BY_ID_ERROR, message);
export const lookupCompanyGetByIdDispose = () => action(LookupCompanyAction.GET_BY_ID_DISPOSE);