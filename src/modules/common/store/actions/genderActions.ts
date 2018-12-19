import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum GenderAction {
  GET_ALL_REQUEST = '@@system/gender/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/gender/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/gender/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/gender/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/gender/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/gender/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/gender/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/gender/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/gender/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/gender/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/gender/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/gender/GET_BY_ID_DISPOSE',
}

// get all
export const genderGetAllRequest = (request: ISystemAllRequest) => action(GenderAction.GET_ALL_REQUEST, request);
export const genderGetAllSuccess = (response: IResponseCollection<ISystem>) => action(GenderAction.GET_ALL_SUCCESS, response);
export const genderGetAllError = (message: string) => action(GenderAction.GET_ALL_ERROR, message);
export const genderGetAllDispose = () => action(GenderAction.GET_ALL_DISPOSE);

// get list
export const genderGetListRequest = (request: ISystemListRequest) => action(GenderAction.GET_LIST_REQUEST, request);
export const genderGetListSuccess = (response: IResponseCollection<ISystemList>) => action(GenderAction.GET_LIST_SUCCESS, response);
export const genderGetListError = (message: string) => action(GenderAction.GET_LIST_ERROR, message);
export const genderGetListDispose = () => action(GenderAction.GET_LIST_DISPOSE);

// get by id
export const genderGetByIdRequest = (request: ISystemByIdRequest) => action(GenderAction.GET_BY_ID_REQUEST, request);
export const genderGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(GenderAction.GET_BY_ID_SUCCESS, response);
export const genderGetByIdError = (message: string) => action(GenderAction.GET_BY_ID_ERROR, message);
export const genderGetByIdDispose = () => action(GenderAction.GET_BY_ID_DISPOSE);