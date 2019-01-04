import { 
  IEmployeeTrainingAllRequest, 
  IEmployeeTrainingByIdRequest, 
  IEmployeeTrainingDeleteRequest, 
  IEmployeeTrainingListRequest, 
  IEmployeeTrainingPostRequest, 
  IEmployeeTrainingPutRequest 
} from '@account/classes/queries/employeeTraining';
import { 
  IEmployeeTraining, 
  IEmployeeTrainingList 
} from '@account/classes/response/employeeTraining';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeTrainingAction {
  GET_ALL_REQUEST = '@@account/employee/training/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employee/training/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employee/training/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employee/training/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@account/employee/training/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@account/employee/training/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@account/employee/training/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@account/employee/training/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employee/training/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employee/training/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employee/training/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employee/training/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@account/employee/training/POST_REQUEST',
  POST_SUCCESS = '@@account/employee/training/POST_SUCCESS',
  POST_ERROR = '@@account/employee/training/POST_ERROR',
  POST_DISPOSE = '@@account/employee/training/POST_DISPOSE',
  PUT_REQUEST = '@@account/employee/training/PUT_REQUEST',
  PUT_SUCCESS = '@@account/employee/training/PUT_SUCCESS',
  PUT_ERROR = '@@account/employee/training/PUT_ERROR',
  PUT_DISPOSE = '@@account/employee/training/PUT_DISPOSE',
  DELETE_REQUEST = '@@account/employee/training/DELETE_REQUEST',
  DELETE_SUCCESS = '@@account/employee/training/DELETE_SUCCESS',
  DELETE_ERROR = '@@account/employee/training/DELETE_ERROR',
  DELETE_DISPOSE = '@@account/employee/training/DELETE_DISPOSE'
}

// get all
export const accountEmployeeTrainingGetAllRequest = (request: IEmployeeTrainingAllRequest) => action(AccountEmployeeTrainingAction.GET_ALL_REQUEST, request);
export const accountEmployeeTrainingGetAllSuccess = (response: IResponseCollection<IEmployeeTraining>) => action(AccountEmployeeTrainingAction.GET_ALL_SUCCESS, response);
export const accountEmployeeTrainingGetAllError = (message: string) => action(AccountEmployeeTrainingAction.GET_ALL_ERROR, message);
export const accountEmployeeTrainingGetAllDispose = () => action(AccountEmployeeTrainingAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeTrainingGetListRequest = (request: IEmployeeTrainingListRequest) => action(AccountEmployeeTrainingAction.GET_LIST_REQUEST, request);
export const accountEmployeeTrainingGetListSuccess = (response: IResponseCollection<IEmployeeTrainingList>) => action(AccountEmployeeTrainingAction.GET_LIST_SUCCESS, response);
export const accountEmployeeTrainingGetListError = (message: string) => action(AccountEmployeeTrainingAction.GET_LIST_ERROR, message);
export const accountEmployeeTrainingGetListDispose = () => action(AccountEmployeeTrainingAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeTrainingGetByIdRequest = (request: IEmployeeTrainingByIdRequest) => action(AccountEmployeeTrainingAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeTrainingGetByIdSuccess = (response: IResponseCollection<IEmployeeTraining>) => action(AccountEmployeeTrainingAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeTrainingGetByIdError = (message: string) => action(AccountEmployeeTrainingAction.GET_BY_ID_ERROR, message);
export const accountEmployeeTrainingGetByIdDispose = () => action(AccountEmployeeTrainingAction.GET_BY_ID_DISPOSE);

// post
export const accountEmployeeTrainingPostRequest = (request: IEmployeeTrainingPostRequest) => action(AccountEmployeeTrainingAction.POST_REQUEST, request);
export const accountEmployeeTrainingPostSuccess = (response: IResponseSingle<IEmployeeTraining>) => action(AccountEmployeeTrainingAction.POST_SUCCESS, response);
export const accountEmployeeTrainingPostError = (message: string) => action(AccountEmployeeTrainingAction.POST_ERROR, message);
export const accountEmployeeTrainingPostDispose = () => action(AccountEmployeeTrainingAction.POST_DISPOSE);

// put
export const accountEmployeeTrainingPutRequest = (request: IEmployeeTrainingPutRequest) => action(AccountEmployeeTrainingAction.PUT_REQUEST, request);
export const accountEmployeeTrainingPutSuccess = (response: IResponseSingle<IEmployeeTraining>) => action(AccountEmployeeTrainingAction.PUT_SUCCESS, response);
export const accountEmployeeTrainingPutError = (message: string) => action(AccountEmployeeTrainingAction.PUT_ERROR, message);
export const accountEmployeeTrainingPutDispose = () => action(AccountEmployeeTrainingAction.PUT_DISPOSE);

// delete
export const accountEmployeeTrainingDeleteRequest = (request: IEmployeeTrainingDeleteRequest) => action(AccountEmployeeTrainingAction.DELETE_REQUEST, request);
export const accountEmployeeTrainingDeleteSuccess = (response: boolean) => action(AccountEmployeeTrainingAction.DELETE_SUCCESS, response);
export const accountEmployeeTrainingDeleteError = (message: string) => action(AccountEmployeeTrainingAction.DELETE_ERROR, message);
export const accountEmployeeTrainingDeleteDispose = () => action(AccountEmployeeTrainingAction.DELETE_DISPOSE);
