import { IResponseCollection } from '@generic/interfaces';
import { ICompanyAllRequest, ICompanyByIdRequest, ICompanyListRequest } from '@lookup/classes/queries';
import { ICompany, ICompanyDetail, ICompanyList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum CompanyAction {
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
export const companyGetAllRequest = (request: ICompanyAllRequest) => action(CompanyAction.GET_ALL_REQUEST, request);
export const companyGetAllSuccess = (response: IResponseCollection<ICompany>) => action(CompanyAction.GET_ALL_SUCCESS, response);
export const companyGetAllError = (message: string) => action(CompanyAction.GET_ALL_ERROR, message);
export const companyGetAllDispose = () => action(CompanyAction.GET_ALL_DISPOSE);

// get list
export const companyGetListRequest = (request: ICompanyListRequest) => action(CompanyAction.GET_LIST_REQUEST, request);
export const companyGetListSuccess = (response: IResponseCollection<ICompanyList>) => action(CompanyAction.GET_LIST_SUCCESS, response);
export const companyGetListError = (message: string) => action(CompanyAction.GET_LIST_ERROR, message);
export const companyGetListDispose = () => action(CompanyAction.GET_LIST_DISPOSE);

// get by id
export const companyGetByIdRequest = (request: ICompanyByIdRequest) => action(CompanyAction.GET_BY_ID_REQUEST, request);
export const companyGetByIdSuccess = (response: IResponseCollection<ICompanyDetail>) => action(CompanyAction.GET_BY_ID_SUCCESS, response);
export const companyGetByIdError = (message: string) => action(CompanyAction.GET_BY_ID_ERROR, message);
export const companyGetByIdDispose = () => action(CompanyAction.GET_BY_ID_DISPOSE);