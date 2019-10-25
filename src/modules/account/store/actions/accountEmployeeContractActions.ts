import { 
  IEmployeeContractAllRequest, 
  IEmployeeContractByIdRequest, 
  IEmployeeContractDeleteRequest, 
  IEmployeeContractListRequest, 
  IEmployeeContractPostRequest, 
  IEmployeeContractPutRequest 
} from '@account/classes/queries/employeeContract';
import { 
  IEmployeeContract, 
  IEmployeeContractDetail, 
  IEmployeeContractList 
} from '@account/classes/response/employeeContract';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeContractAction {
  GET_ALL_REQUEST = '@@account/employee/contract/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employee/contract/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employee/contract/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employee/contract/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@account/employee/contract/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@account/employee/contract/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@account/employee/contract/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@account/employee/contract/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employee/contract/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employee/contract/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employee/contract/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employee/contract/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@account/employee/contract/POST_REQUEST',
  POST_SUCCESS = '@@account/employee/contract/POST_SUCCESS',
  POST_ERROR = '@@account/employee/contract/POST_ERROR',
  POST_DISPOSE = '@@account/employee/contract/POST_DISPOSE',
  PUT_REQUEST = '@@account/employee/contract/PUT_REQUEST',
  PUT_SUCCESS = '@@account/employee/contract/PUT_SUCCESS',
  PUT_ERROR = '@@account/employee/contract/PUT_ERROR',
  PUT_DISPOSE = '@@account/employee/contract/PUT_DISPOSE',
  DELETE_REQUEST = '@@account/employee/contract/DELETE_REQUEST',
  DELETE_SUCCESS = '@@account/employee/contract/DELETE_SUCCESS',
  DELETE_ERROR = '@@account/employee/contract/DELETE_ERROR',
  DELETE_DISPOSE = '@@account/employee/contract/DELETE_DISPOSE'
}

// get all
export const accountEmployeeContractGetAllRequest = (request: IEmployeeContractAllRequest) => action(AccountEmployeeContractAction.GET_ALL_REQUEST, request);
export const accountEmployeeContractGetAllSuccess = (response: IResponseCollection<IEmployeeContract>) => action(AccountEmployeeContractAction.GET_ALL_SUCCESS, response);
export const accountEmployeeContractGetAllError = (error: any) => action(AccountEmployeeContractAction.GET_ALL_ERROR, error);
export const accountEmployeeContractGetAllDispose = () => action(AccountEmployeeContractAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeContractGetListRequest = (request: IEmployeeContractListRequest) => action(AccountEmployeeContractAction.GET_LIST_REQUEST, request);
export const accountEmployeeContractGetListSuccess = (response: IResponseCollection<IEmployeeContractList>) => action(AccountEmployeeContractAction.GET_LIST_SUCCESS, response);
export const accountEmployeeContractGetListError = (error: any) => action(AccountEmployeeContractAction.GET_LIST_ERROR, error);
export const accountEmployeeContractGetListDispose = () => action(AccountEmployeeContractAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeContractGetByIdRequest = (request: IEmployeeContractByIdRequest) => action(AccountEmployeeContractAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeContractGetByIdSuccess = (response: IResponseCollection<IEmployeeContractDetail>) => action(AccountEmployeeContractAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeContractGetByIdError = (error: any) => action(AccountEmployeeContractAction.GET_BY_ID_ERROR, error);
export const accountEmployeeContractGetByIdDispose = () => action(AccountEmployeeContractAction.GET_BY_ID_DISPOSE);

// post
export const accountEmployeeContractPostRequest = (request: IEmployeeContractPostRequest) => action(AccountEmployeeContractAction.POST_REQUEST, request);
export const accountEmployeeContractPostSuccess = (response: IResponseSingle<IEmployeeContract>) => action(AccountEmployeeContractAction.POST_SUCCESS, response);
export const accountEmployeeContractPostError = (error: any) => action(AccountEmployeeContractAction.POST_ERROR, error);
export const accountEmployeeContractPostDispose = () => action(AccountEmployeeContractAction.POST_DISPOSE);

// put
export const accountEmployeeContractPutRequest = (request: IEmployeeContractPutRequest) => action(AccountEmployeeContractAction.PUT_REQUEST, request);
export const accountEmployeeContractPutSuccess = (response: IResponseSingle<IEmployeeContract>) => action(AccountEmployeeContractAction.PUT_SUCCESS, response);
export const accountEmployeeContractPutError = (error: any) => action(AccountEmployeeContractAction.PUT_ERROR, error);
export const accountEmployeeContractPutDispose = () => action(AccountEmployeeContractAction.PUT_DISPOSE);

// delete
export const accountEmployeeContractDeleteRequest = (request: IEmployeeContractDeleteRequest) => action(AccountEmployeeContractAction.DELETE_REQUEST, request);
export const accountEmployeeContractDeleteSuccess = (response: boolean) => action(AccountEmployeeContractAction.DELETE_SUCCESS, response);
export const accountEmployeeContractDeleteError = (error: any) => action(AccountEmployeeContractAction.DELETE_ERROR, error);
export const accountEmployeeContractDeleteDispose = () => action(AccountEmployeeContractAction.DELETE_DISPOSE);
