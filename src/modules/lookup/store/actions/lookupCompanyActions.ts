import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { ILookupCompanyDeleteRequest, ILookupCompanyGetAllRequest, ILookupCompanyGetDetailRequest, ILookupCompanyGetListRequest, ILookupCompanyPostRequest, ILookupCompanyPutRequest } from '@lookup/classes/queries/company';
import { ICompany, ICompanyDetail, ICompanyList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupCompanyAction {
  GET_ALL_REQUEST = '@@lookup/company/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/company/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/company/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/company/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/company/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/company/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/company/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/company/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/company/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/company/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/company/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/company/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/company/POST_REQUEST',
  POST_SUCCESS = '@@lookup/company/POST_SUCCESS',
  POST_ERROR = '@@lookup/company/POST_ERROR',
  POST_DISPOSE = '@@lookup/company/POST_DISPOSE',
  PUT_REQUEST = '@@lookup/company/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/company/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/company/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/company/DELETE_DISPOSE',
  DELETE_REQUEST = '@@lookup/company/DELETE_REQUEST',
  DELETE_SUCCESS = '@@lookup/company/DELETE_SUCCESS',
  DELETE_ERROR = '@@lookup/company/DELETE_ERROR',
  DELETE_DISPOSE = '@@lookup/company/DELETE_DISPOSE',
}

// get all
export const lookupCompanyGetAllRequest = (request: ILookupCompanyGetAllRequest) => action(LookupCompanyAction.GET_ALL_REQUEST, request);
export const lookupCompanyGetAllSuccess = (response: IResponseCollection<ICompany>) => action(LookupCompanyAction.GET_ALL_SUCCESS, response);
export const lookupCompanyGetAllError = (error: any) => action(LookupCompanyAction.GET_ALL_ERROR, error);
export const lookupCompanyGetAllDispose = () => action(LookupCompanyAction.GET_ALL_DISPOSE);

// get list
export const lookupCompanyGetListRequest = (request: ILookupCompanyGetListRequest) => action(LookupCompanyAction.GET_LIST_REQUEST, request);
export const lookupCompanyGetListSuccess = (response: IResponseCollection<ICompanyList>) => action(LookupCompanyAction.GET_LIST_SUCCESS, response);
export const lookupCompanyGetListError = (error: any) => action(LookupCompanyAction.GET_LIST_ERROR, error);
export const lookupCompanyGetListDispose = () => action(LookupCompanyAction.GET_LIST_DISPOSE);

// get by id
export const lookupCompanyGetByIdRequest = (request: ILookupCompanyGetDetailRequest) => action(LookupCompanyAction.GET_BY_ID_REQUEST, request);
export const lookupCompanyGetByIdSuccess = (response: IResponseCollection<ICompanyDetail>) => action(LookupCompanyAction.GET_BY_ID_SUCCESS, response);
export const lookupCompanyGetByIdError = (error: any) => action(LookupCompanyAction.GET_BY_ID_ERROR, error);
export const lookupCompanyGetByIdDispose = () => action(LookupCompanyAction.GET_BY_ID_DISPOSE);

// post
export const lookupCompanyPostRequest = (request: ILookupCompanyPostRequest) => action(LookupCompanyAction.POST_REQUEST, request);
export const lookupCompanyPostSuccess = (response: IResponseSingle<ICompany>) => action(LookupCompanyAction.POST_SUCCESS, response);
export const lookupCompanyPostError = (error: any) => action(LookupCompanyAction.POST_ERROR, error);
export const lookupCompanyPostDispose = () => action(LookupCompanyAction.POST_DISPOSE);

// put
export const lookupCompanyPutRequest = (request: ILookupCompanyPutRequest) => action(LookupCompanyAction.PUT_REQUEST, request);
export const lookupCompanyPutSuccess = (response: IResponseSingle<ICompany>) => action(LookupCompanyAction.PUT_SUCCESS, response);
export const lookupCompanyPutError = (error: any) => action(LookupCompanyAction.PUT_ERROR, error);
export const lookupCompanyPutDispose = () => action(LookupCompanyAction.PUT_DISPOSE);

// delete
export const lookupCompanyDeleteRequest = (request: ILookupCompanyDeleteRequest) => action(LookupCompanyAction.DELETE_REQUEST, request);
export const lookupCompanyDeleteSuccess = (response: boolean) => action(LookupCompanyAction.DELETE_SUCCESS, response);
export const lookupCompanyDeleteError = (error: any) => action(LookupCompanyAction.DELETE_ERROR, error);
export const lookupCompanyDeleteDispose = () => action(LookupCompanyAction.DELETE_DISPOSE);