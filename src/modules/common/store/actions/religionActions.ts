import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum ReligionAction {
  GET_ALL_REQUEST = '@@system/religion/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/religion/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/religion/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/religion/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/religion/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/religion/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/religion/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/religion/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/religion/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/religion/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/religion/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/religion/GET_BY_ID_DISPOSE',
}

// get all
export const religionGetAllRequest = (request: ISystemAllRequest) => action(ReligionAction.GET_ALL_REQUEST, request);
export const religionGetAllSuccess = (response: IResponseCollection<ISystem>) => action(ReligionAction.GET_ALL_SUCCESS, response);
export const religionGetAllError = (error: any) => action(ReligionAction.GET_ALL_ERROR, error);
export const religionGetAllDispose = () => action(ReligionAction.GET_ALL_DISPOSE);

// get list
export const religionGetListRequest = (request: ISystemListRequest) => action(ReligionAction.GET_LIST_REQUEST, request);
export const religionGetListSuccess = (response: IResponseCollection<ISystemList>) => action(ReligionAction.GET_LIST_SUCCESS, response);
export const religionGetListError = (error: any) => action(ReligionAction.GET_LIST_ERROR, error);
export const religionGetListDispose = () => action(ReligionAction.GET_LIST_DISPOSE);

// get by id
export const religionGetByIdRequest = (request: ISystemByIdRequest) => action(ReligionAction.GET_BY_ID_REQUEST, request);
export const religionGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(ReligionAction.GET_BY_ID_SUCCESS, response);
export const religionGetByIdError = (error: any) => action(ReligionAction.GET_BY_ID_ERROR, error);
export const religionGetByIdDispose = () => action(ReligionAction.GET_BY_ID_DISPOSE);