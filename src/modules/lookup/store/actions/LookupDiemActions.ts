import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { IDiem, IDiemDetail, IDiemList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';
// tslint:disable-next-line:ordered-imports
import { ILookupDiemPostRequest, ILookupDiemPutRequest, ILookupDiemDeleteRequest, ILookupDiemAllRequest, ILookupDiemListRequest, ILookupDiemDetailRequest } from '@lookup/classes/queries/diem';

export const enum LookupDiemAction {
  GET_ALL_REQUEST = '@@lookup/diem/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/diem/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/diem/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/diem/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/diem/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/diem/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/diem/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/diem/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/diem/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/diem/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/diem/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/diem/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/diem/POST_REQUEST',
  POST_SUCCESS = '@@lookup/diem/POST_SUCCESS',
  POST_ERROR = '@@lookup/diem/POST_ERROR',
  POST_DISPOSE = '@@lookup/diem/POST_DISPOSE',
  PUT_REQUEST = '@@lookup/diem/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/diem/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/diem/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/diem/DELETE_DISPOSE',
  DELETE_REQUEST = '@@lookup/diem/DELETE_REQUEST',
  DELETE_SUCCESS = '@@lookup/diem/DELETE_SUCCESS',
  DELETE_ERROR = '@@lookup/diem/DELETE_ERROR',
  DELETE_DISPOSE = '@@lookup/diem/DELETE_DISPOSE',
}

// get all
export const lookupDiemGetAllRequest = (request: ILookupDiemAllRequest) => action(LookupDiemAction.GET_ALL_REQUEST, request);
export const lookupDiemGetAllSuccess = (response: IResponseCollection<IDiem>) => action(LookupDiemAction.GET_ALL_SUCCESS, response);
export const lookupDiemGetAllError = (error: any) => action(LookupDiemAction.GET_ALL_ERROR, error);
export const lookupDiemGetAllDispose = () => action(LookupDiemAction.GET_ALL_DISPOSE);

// get list
export const lookupDiemGetListRequest = (request: ILookupDiemListRequest) => action(LookupDiemAction.GET_LIST_REQUEST, request);
export const lookupDiemGetListSuccess = (response: IResponseCollection<IDiemList>) => action(LookupDiemAction.GET_LIST_SUCCESS, response);
export const lookupDiemGetListError = (error: any) => action(LookupDiemAction.GET_LIST_ERROR, error);
export const lookupDiemGetListDispose = () => action(LookupDiemAction.GET_LIST_DISPOSE);

// get by id
export const lookupDiemGetByIdRequest = (request: ILookupDiemDetailRequest) => action(LookupDiemAction.GET_BY_ID_REQUEST, request);
export const lookupDiemGetByIdSuccess = (response: IResponseSingle<IDiemDetail>) => action(LookupDiemAction.GET_BY_ID_SUCCESS, response);
export const lookupDiemGetByIdError = (error: any) => action(LookupDiemAction.GET_BY_ID_ERROR, error);
export const lookupDiemGetByIdDispose = () => action(LookupDiemAction.GET_BY_ID_DISPOSE);

// post
export const lookupDiemPostRequest = (request: ILookupDiemPostRequest) => action(LookupDiemAction.POST_REQUEST, request);
export const lookupDiemPostSuccess = (response: IResponseSingle<IDiem>) => action(LookupDiemAction.POST_SUCCESS, response);
export const lookupDiemPostError = (error: any) => action(LookupDiemAction.POST_ERROR, error);
export const lookupDiemPostDispose = () => action(LookupDiemAction.POST_DISPOSE);

// put
export const lookupDiemPutRequest = (request: ILookupDiemPutRequest) => action(LookupDiemAction.PUT_REQUEST, request);
export const lookupDiemPutSuccess = (response: IResponseSingle<IDiem>) => action(LookupDiemAction.PUT_SUCCESS, response);
export const lookupDiemPutError = (error: any) => action(LookupDiemAction.PUT_ERROR, error);
export const lookupDiemPutDispose = () => action(LookupDiemAction.PUT_DISPOSE);

// delete
export const lookupDiemDeleteRequest = (request: ILookupDiemDeleteRequest) => action(LookupDiemAction.DELETE_REQUEST, request);
export const lookupDiemDeleteSuccess = (response: boolean) => action(LookupDiemAction.DELETE_SUCCESS, response);
export const lookupDiemDeleteError = (error: any) => action(LookupDiemAction.DELETE_ERROR, error);
export const lookupDiemDeleteDispose = () => action(LookupDiemAction.DELETE_DISPOSE);