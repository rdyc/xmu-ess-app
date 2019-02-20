import { 
  IEmployeeAccessHistoryAllRequest, 
  IEmployeeAccessHistoryByIdRequest, 
  IEmployeeAccessHistoryListRequest 
} from '@account/classes/queries/employeeAccessHistory';
import { 
  IEmployeeAccessHistory, 
  IEmployeeAccessHistoryDetail, 
  IEmployeeAccessHistoryList 
} from '@account/classes/response/employeeAccessHistory';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeAccessHistoryAction {
  GET_ALL_REQUEST = '@@account/employee/access/history/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employee/access/history/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employee/access/history/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employee/access/history/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@account/employee/access/history/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@account/employee/access/history/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@account/employee/access/history/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@account/employee/access/history/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employee/access/history/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employee/access/history/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employee/access/history/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employee/access/history/GET_BY_ID_DISPOSE'
}

// get all
export const accountEmployeeAccessHistoryGetAllRequest = (request: IEmployeeAccessHistoryAllRequest) => action(AccountEmployeeAccessHistoryAction.GET_ALL_REQUEST, request);
export const accountEmployeeAccessHistoryGetAllSuccess = (response: IResponseCollection<IEmployeeAccessHistory>) => action(AccountEmployeeAccessHistoryAction.GET_ALL_SUCCESS, response);
export const accountEmployeeAccessHistoryGetAllError = (error: any) => action(AccountEmployeeAccessHistoryAction.GET_ALL_ERROR, error);
export const accountEmployeeAccessHistoryGetAllDispose = () => action(AccountEmployeeAccessHistoryAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeAccessHistoryGetListRequest = (request: IEmployeeAccessHistoryListRequest) => action(AccountEmployeeAccessHistoryAction.GET_LIST_REQUEST, request);
export const accountEmployeeAccessHistoryGetListSuccess = (response: IResponseCollection<IEmployeeAccessHistoryList>) => action(AccountEmployeeAccessHistoryAction.GET_LIST_SUCCESS, response);
export const accountEmployeeAccessHistoryGetListError = (error: any) => action(AccountEmployeeAccessHistoryAction.GET_LIST_ERROR, error);
export const accountEmployeeAccessHistoryGetListDispose = () => action(AccountEmployeeAccessHistoryAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeAccessHistoryGetByIdRequest = (request: IEmployeeAccessHistoryByIdRequest) => action(AccountEmployeeAccessHistoryAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeAccessHistoryGetByIdSuccess = (response: IResponseCollection<IEmployeeAccessHistoryDetail>) => action(AccountEmployeeAccessHistoryAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeAccessHistoryGetByIdError = (error: any) => action(AccountEmployeeAccessHistoryAction.GET_BY_ID_ERROR, error);
export const accountEmployeeAccessHistoryGetByIdDispose = () => action(AccountEmployeeAccessHistoryAction.GET_BY_ID_DISPOSE);