import { 
  IEmployeeRateAllRequest, 
  IEmployeeRateByIdRequest, 
  IEmployeeRateListRequest, 
  IEmployeeRatePutRequest 
} from '@account/classes/queries/employeeRate';
import { 
  IEmployeeRate, 
  IEmployeeRateList 
} from '@account/classes/response/employeeRate';
import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeRateAction {
  GET_ALL_REQUEST = '@@account/employee/rate/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@account/employee/rate/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@account/employee/rate/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@account/employee/rate/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@account/employee/rate/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@account/employee/rate/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@account/employee/rate/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@account/employee/rate/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@account/employee/rate/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employee/rate/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employee/rate/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employee/rate/GET_BY_ID_DISPOSE',
  PUT_REQUEST = '@@account/employee/rate/PUT_REQUEST',
  PUT_SUCCESS = '@@account/employee/rate/PUT_SUCCESS',
  PUT_ERROR = '@@account/employee/rate/PUT_ERROR',
  PUT_DISPOSE = '@@account/employee/rate/PUT_DISPOSE',
}

// get all
export const accountEmployeeRateGetAllRequest = (request: IEmployeeRateAllRequest) => action(AccountEmployeeRateAction.GET_ALL_REQUEST, request);
export const accountEmployeeRateGetAllSuccess = (response: IResponseCollection<IEmployeeRate>) => action(AccountEmployeeRateAction.GET_ALL_SUCCESS, response);
export const accountEmployeeRateGetAllError = (error: any) => action(AccountEmployeeRateAction.GET_ALL_ERROR, error);
export const accountEmployeeRateGetAllDispose = () => action(AccountEmployeeRateAction.GET_ALL_DISPOSE);

// get list
export const accountEmployeeRateGetListRequest = (request: IEmployeeRateListRequest) => action(AccountEmployeeRateAction.GET_LIST_REQUEST, request);
export const accountEmployeeRateGetListSuccess = (response: IResponseCollection<IEmployeeRateList>) => action(AccountEmployeeRateAction.GET_LIST_SUCCESS, response);
export const accountEmployeeRateGetListError = (error: any) => action(AccountEmployeeRateAction.GET_LIST_ERROR, error);
export const accountEmployeeRateGetListDispose = () => action(AccountEmployeeRateAction.GET_LIST_DISPOSE);

// get by id
export const accountEmployeeRateGetByIdRequest = (request: IEmployeeRateByIdRequest) => action(AccountEmployeeRateAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeRateGetByIdSuccess = (response: IResponseCollection<IEmployeeRate>) => action(AccountEmployeeRateAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeRateGetByIdError = (error: any) => action(AccountEmployeeRateAction.GET_BY_ID_ERROR, error);
export const accountEmployeeRateGetByIdDispose = () => action(AccountEmployeeRateAction.GET_BY_ID_DISPOSE);

// put
export const accountEmployeeRatePutRequest = (request: IEmployeeRatePutRequest) => action(AccountEmployeeRateAction.PUT_REQUEST, request);
export const accountEmployeeRatePutSuccess = (response: IResponseSingle<IEmployeeRate>) => action(AccountEmployeeRateAction.PUT_SUCCESS, response);
export const accountEmployeeRatePutError = (error: any) => action(AccountEmployeeRateAction.PUT_ERROR, error);
export const accountEmployeeRatePutDispose = () => action(AccountEmployeeRateAction.PUT_DISPOSE);