import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum FamilyAction {
  GET_ALL_REQUEST = '@@system/family/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/family/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/family/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/family/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/family/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/family/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/family/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/family/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/family/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/family/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/family/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/family/GET_BY_ID_DISPOSE',
}

// get all
export const familyGetAllRequest = (request: ISystemAllRequest) => action(FamilyAction.GET_ALL_REQUEST, request);
export const familyGetAllSuccess = (response: IResponseCollection<ISystem>) => action(FamilyAction.GET_ALL_SUCCESS, response);
export const familyGetAllError = (error: any) => action(FamilyAction.GET_ALL_ERROR, error);
export const familyGetAllDispose = () => action(FamilyAction.GET_ALL_DISPOSE);

// get list
export const familyGetListRequest = (request: ISystemListRequest) => action(FamilyAction.GET_LIST_REQUEST, request);
export const familyGetListSuccess = (response: IResponseCollection<ISystemList>) => action(FamilyAction.GET_LIST_SUCCESS, response);
export const familyGetListError = (error: any) => action(FamilyAction.GET_LIST_ERROR, error);
export const familyGetListDispose = () => action(FamilyAction.GET_LIST_DISPOSE);

// get by id
export const familyGetByIdRequest = (request: ISystemByIdRequest) => action(FamilyAction.GET_BY_ID_REQUEST, request);
export const familyGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(FamilyAction.GET_BY_ID_SUCCESS, response);
export const familyGetByIdError = (error: any) => action(FamilyAction.GET_BY_ID_ERROR, error);
export const familyGetByIdDispose = () => action(FamilyAction.GET_BY_ID_DISPOSE);