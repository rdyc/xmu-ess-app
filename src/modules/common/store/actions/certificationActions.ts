import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum CertificationAction {
  GET_ALL_REQUEST = '@@system/certification/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/certification/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/certification/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/certification/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/certification/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/certification/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/certification/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/certification/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/certification/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/certification/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/certification/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/certification/GET_BY_ID_DISPOSE',
}

// get all
export const certificationGetAllRequest = (request: ISystemAllRequest) => action(CertificationAction.GET_ALL_REQUEST, request);
export const certificationGetAllSuccess = (response: IResponseCollection<ISystem>) => action(CertificationAction.GET_ALL_SUCCESS, response);
export const certificationGetAllError = (error: any) => action(CertificationAction.GET_ALL_ERROR, error);
export const certificationGetAllDispose = () => action(CertificationAction.GET_ALL_DISPOSE);

// get list
export const certificationGetListRequest = (request: ISystemListRequest) => action(CertificationAction.GET_LIST_REQUEST, request);
export const certificationGetListSuccess = (response: IResponseCollection<ISystemList>) => action(CertificationAction.GET_LIST_SUCCESS, response);
export const certificationGetListError = (error: any) => action(CertificationAction.GET_LIST_ERROR, error);
export const certificationGetListDispose = () => action(CertificationAction.GET_LIST_DISPOSE);

// get by id
export const certificationGetByIdRequest = (request: ISystemByIdRequest) => action(CertificationAction.GET_BY_ID_REQUEST, request);
export const certificationGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(CertificationAction.GET_BY_ID_SUCCESS, response);
export const certificationGetByIdError = (error: any) => action(CertificationAction.GET_BY_ID_ERROR, error);
export const certificationGetByIdDispose = () => action(CertificationAction.GET_BY_ID_DISPOSE);