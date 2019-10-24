import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum CompetencyAction {
  GET_ALL_REQUEST = '@@system/competency/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/competency/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/competency/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/competency/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/competency/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/competency/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/competency/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/competency/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/competency/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/competency/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/competency/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/competency/GET_BY_ID_DISPOSE',
}

// get all
export const competencyGetAllRequest = (request: ISystemAllRequest) => action(CompetencyAction.GET_ALL_REQUEST, request);
export const competencyGetAllSuccess = (response: IResponseCollection<ISystem>) => action(CompetencyAction.GET_ALL_SUCCESS, response);
export const competencyGetAllError = (error: any) => action(CompetencyAction.GET_ALL_ERROR, error);
export const competencyGetAllDispose = () => action(CompetencyAction.GET_ALL_DISPOSE);

// get list
export const competencyGetListRequest = (request: ISystemListRequest) => action(CompetencyAction.GET_LIST_REQUEST, request);
export const competencyGetListSuccess = (response: IResponseCollection<ISystemList>) => action(CompetencyAction.GET_LIST_SUCCESS, response);
export const competencyGetListError = (error: any) => action(CompetencyAction.GET_LIST_ERROR, error);
export const competencyGetListDispose = () => action(CompetencyAction.GET_LIST_DISPOSE);

// get by id
export const competencyGetByIdRequest = (request: ISystemByIdRequest) => action(CompetencyAction.GET_BY_ID_REQUEST, request);
export const competencyGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(CompetencyAction.GET_BY_ID_SUCCESS, response);
export const competencyGetByIdError = (error: any) => action(CompetencyAction.GET_BY_ID_ERROR, error);
export const competencyGetByIdDispose = () => action(CompetencyAction.GET_BY_ID_DISPOSE);