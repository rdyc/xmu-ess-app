import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum ActivityAction {
  GET_ALL_REQUEST = '@@system/activity/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/activity/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/activity/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/activity/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/activity/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/activity/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/activity/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/activity/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/activity/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/activity/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/activity/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/activity/GET_BY_ID_DISPOSE',
}

// get all
export const activityGetAllRequest = (request: ISystemAllRequest) => action(ActivityAction.GET_ALL_REQUEST, request);
export const activityGetAllSuccess = (response: IResponseCollection<ISystem>) => action(ActivityAction.GET_ALL_SUCCESS, response);
export const activityGetAllError = (error: any) => action(ActivityAction.GET_ALL_ERROR, error);
export const activityGetAllDispose = () => action(ActivityAction.GET_ALL_DISPOSE);

// get list
export const activityGetListRequest = (request: ISystemListRequest) => action(ActivityAction.GET_LIST_REQUEST, request);
export const activityGetListSuccess = (response: IResponseCollection<ISystemList>) => action(ActivityAction.GET_LIST_SUCCESS, response);
export const activityGetListError = (error: any) => action(ActivityAction.GET_LIST_ERROR, error);
export const activityGetListDispose = () => action(ActivityAction.GET_LIST_DISPOSE);

// get by id
export const activityGetByIdRequest = (request: ISystemByIdRequest) => action(ActivityAction.GET_BY_ID_REQUEST, request);
export const activityGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(ActivityAction.GET_BY_ID_SUCCESS, response);
export const activityGetByIdError = (error: any) => action(ActivityAction.GET_BY_ID_ERROR, error);
export const activityGetByIdDispose = () => action(ActivityAction.GET_BY_ID_DISPOSE);