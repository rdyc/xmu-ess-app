import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AssessorAction {
  GET_ALL_REQUEST = '@@system/assessor/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/assessor/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/assessor/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/assessor/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/assessor/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/assessor/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/assessor/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/assessor/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/assessor/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/assessor/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/assessor/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/assessor/GET_BY_ID_DISPOSE',
}

// get all
export const assessorGetAllRequest = (request: ISystemAllRequest) => action(AssessorAction.GET_ALL_REQUEST, request);
export const assessorGetAllSuccess = (response: IResponseCollection<ISystem>) => action(AssessorAction.GET_ALL_SUCCESS, response);
export const assessorGetAllError = (error: any) => action(AssessorAction.GET_ALL_ERROR, error);
export const assessorGetAllDispose = () => action(AssessorAction.GET_ALL_DISPOSE);

// get list
export const assessorGetListRequest = (request: ISystemListRequest) => action(AssessorAction.GET_LIST_REQUEST, request);
export const assessorGetListSuccess = (response: IResponseCollection<ISystemList>) => action(AssessorAction.GET_LIST_SUCCESS, response);
export const assessorGetListError = (error: any) => action(AssessorAction.GET_LIST_ERROR, error);
export const assessorGetListDispose = () => action(AssessorAction.GET_LIST_DISPOSE);

// get by id
export const assessorGetByIdRequest = (request: ISystemByIdRequest) => action(AssessorAction.GET_BY_ID_REQUEST, request);
export const assessorGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(AssessorAction.GET_BY_ID_SUCCESS, response);
export const assessorGetByIdError = (error: any) => action(AssessorAction.GET_BY_ID_ERROR, error);
export const assessorGetByIdDispose = () => action(AssessorAction.GET_BY_ID_DISPOSE);