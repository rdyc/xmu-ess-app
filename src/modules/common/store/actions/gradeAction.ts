import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum GradeAction {
  GET_ALL_REQUEST = '@@system/grade/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/grade/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/grade/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/grade/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/grade/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/grade/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/grade/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/grade/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/grade/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/grade/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/grade/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/grade/GET_BY_ID_DISPOSE',
}

// get all
export const gradeGetAllRequest = (request: ISystemAllRequest) => action(GradeAction.GET_ALL_REQUEST, request);
export const gradeGetAllSuccess = (response: IResponseCollection<ISystem>) => action(GradeAction.GET_ALL_SUCCESS, response);
export const gradeGetAllError = (error: any) => action(GradeAction.GET_ALL_ERROR, error);
export const gradeGetAllDispose = () => action(GradeAction.GET_ALL_DISPOSE);

// get list
export const gradeGetListRequest = (request: ISystemListRequest) => action(GradeAction.GET_LIST_REQUEST, request);
export const gradeGetListSuccess = (response: IResponseCollection<ISystemList>) => action(GradeAction.GET_LIST_SUCCESS, response);
export const gradeGetListError = (error: any) => action(GradeAction.GET_LIST_ERROR, error);
export const gradeGetListDispose = () => action(GradeAction.GET_LIST_DISPOSE);

// get by id
export const gradeGetByIdRequest = (request: ISystemByIdRequest) => action(GradeAction.GET_BY_ID_REQUEST, request);
export const gradeGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(GradeAction.GET_BY_ID_SUCCESS, response);
export const gradeGetByIdError = (error: any) => action(GradeAction.GET_BY_ID_ERROR, error);
export const gradeGetByIdDispose = () => action(GradeAction.GET_BY_ID_DISPOSE);