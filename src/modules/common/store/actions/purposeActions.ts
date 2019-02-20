import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum PurposeAction {
  GET_ALL_REQUEST = '@@system/purpose/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/purpose/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/purpose/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/purpose/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/purpose/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/purpose/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/purpose/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/purpose/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/purpose/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/purpose/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/purpose/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/purpose/GET_BY_ID_DISPOSE',
}

// get all
export const purposeGetAllRequest = (request: ISystemAllRequest) => action(PurposeAction.GET_ALL_REQUEST, request);
export const purposeGetAllSuccess = (response: IResponseCollection<ISystem>) => action(PurposeAction.GET_ALL_SUCCESS, response);
export const purposeGetAllError = (error: any) => action(PurposeAction.GET_ALL_ERROR, error);
export const purposeGetAllDispose = () => action(PurposeAction.GET_ALL_DISPOSE);

// get list
export const purposeGetListRequest = (request: ISystemListRequest) => action(PurposeAction.GET_LIST_REQUEST, request);
export const purposeGetListSuccess = (response: IResponseCollection<ISystemList>) => action(PurposeAction.GET_LIST_SUCCESS, response);
export const purposeGetListError = (error: any) => action(PurposeAction.GET_LIST_ERROR, error);
export const purposeGetListDispose = () => action(PurposeAction.GET_LIST_DISPOSE);

// get by id
export const purposeGetByIdRequest = (request: ISystemByIdRequest) => action(PurposeAction.GET_BY_ID_REQUEST, request);
export const purposeGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(PurposeAction.GET_BY_ID_SUCCESS, response);
export const purposeGetByIdError = (error: any) => action(PurposeAction.GET_BY_ID_ERROR, error);
export const purposeGetByIdDispose = () => action(PurposeAction.GET_BY_ID_DISPOSE);