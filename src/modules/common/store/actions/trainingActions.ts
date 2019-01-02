import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum TrainingAction {
  GET_ALL_REQUEST = '@@system/training/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/training/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/training/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/training/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/training/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/training/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/training/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/training/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/training/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/training/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/training/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/training/GET_BY_ID_DISPOSE',
}

// get all
export const trainingGetAllRequest = (request: ISystemAllRequest) => action(TrainingAction.GET_ALL_REQUEST, request);
export const trainingGetAllSuccess = (response: IResponseCollection<ISystem>) => action(TrainingAction.GET_ALL_SUCCESS, response);
export const trainingGetAllError = (message: string) => action(TrainingAction.GET_ALL_ERROR, message);
export const trainingGetAllDispose = () => action(TrainingAction.GET_ALL_DISPOSE);

// get list
export const trainingGetListRequest = (request: ISystemListRequest) => action(TrainingAction.GET_LIST_REQUEST, request);
export const trainingGetListSuccess = (response: IResponseCollection<ISystemList>) => action(TrainingAction.GET_LIST_SUCCESS, response);
export const trainingGetListError = (message: string) => action(TrainingAction.GET_LIST_ERROR, message);
export const trainingGetListDispose = () => action(TrainingAction.GET_LIST_DISPOSE);

// get by id
export const trainingGetByIdRequest = (request: ISystemByIdRequest) => action(TrainingAction.GET_BY_ID_REQUEST, request);
export const trainingGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(TrainingAction.GET_BY_ID_SUCCESS, response);
export const trainingGetByIdError = (message: string) => action(TrainingAction.GET_BY_ID_ERROR, message);
export const trainingGetByIdDispose = () => action(TrainingAction.GET_BY_ID_DISPOSE);