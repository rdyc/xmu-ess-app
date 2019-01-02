import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum BloodAction {
  GET_ALL_REQUEST = '@@system/blood/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/blood/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/blood/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/blood/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/blood/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/blood/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/blood/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/blood/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/blood/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/blood/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/blood/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/blood/GET_BY_ID_DISPOSE',
}

// get all
export const bloodGetAllRequest = (request: ISystemAllRequest) => action(BloodAction.GET_ALL_REQUEST, request);
export const bloodGetAllSuccess = (response: IResponseCollection<ISystem>) => action(BloodAction.GET_ALL_SUCCESS, response);
export const bloodGetAllError = (message: string) => action(BloodAction.GET_ALL_ERROR, message);
export const bloodGetAllDispose = () => action(BloodAction.GET_ALL_DISPOSE);

// get list
export const bloodGetListRequest = (request: ISystemListRequest) => action(BloodAction.GET_LIST_REQUEST, request);
export const bloodGetListSuccess = (response: IResponseCollection<ISystemList>) => action(BloodAction.GET_LIST_SUCCESS, response);
export const bloodGetListError = (message: string) => action(BloodAction.GET_LIST_ERROR, message);
export const bloodGetListDispose = () => action(BloodAction.GET_LIST_DISPOSE);

// get by id
export const bloodGetByIdRequest = (request: ISystemByIdRequest) => action(BloodAction.GET_BY_ID_REQUEST, request);
export const bloodGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(BloodAction.GET_BY_ID_SUCCESS, response);
export const bloodGetByIdError = (message: string) => action(BloodAction.GET_BY_ID_ERROR, message);
export const bloodGetByIdDispose = () => action(BloodAction.GET_BY_ID_DISPOSE);