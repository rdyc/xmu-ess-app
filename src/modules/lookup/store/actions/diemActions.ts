import { IResponseCollection } from '@generic/interfaces';
import { IDiemAllRequest, IDiemByIdRequest, IDiemListRequest } from '@lookup/classes/queries';
import { IDiem, IDiemDetail, IDiemList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum DiemAction {
  GET_ALL_REQUEST = '@@diem/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@diem/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@diem/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@diem/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@diem/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@diem/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@diem/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@diem/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@diem/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@diem/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@diem/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@diem/GET_BY_ID_DISPOSE',
}

// get all
export const diemGetAllRequest = (request: IDiemAllRequest) => action(DiemAction.GET_ALL_REQUEST, request);
export const diemGetAllSuccess = (response: IResponseCollection<IDiem>) => action(DiemAction.GET_ALL_SUCCESS, response);
export const diemGetAllError = (message: string) => action(DiemAction.GET_ALL_ERROR, message);
export const diemGetAllDispose = () => action(DiemAction.GET_ALL_DISPOSE);

// get list
export const diemGetListRequest = (request: IDiemListRequest) => action(DiemAction.GET_LIST_REQUEST, request);
export const diemGetListSuccess = (response: IResponseCollection<IDiemList>) => action(DiemAction.GET_LIST_SUCCESS, response);
export const diemGetListError = (message: string) => action(DiemAction.GET_LIST_ERROR, message);
export const diemGetListDispose = () => action(DiemAction.GET_LIST_DISPOSE);

// get by id
export const diemGetByIdRequest = (request: IDiemByIdRequest) => action(DiemAction.GET_BY_ID_REQUEST, request);
export const diemGetByIdSuccess = (response: IResponseCollection<IDiemDetail>) => action(DiemAction.GET_BY_ID_SUCCESS, response);
export const diemGetByIdError = (message: string) => action(DiemAction.GET_BY_ID_ERROR, message);
export const diemGetByIdDispose = () => action(DiemAction.GET_BY_ID_DISPOSE);