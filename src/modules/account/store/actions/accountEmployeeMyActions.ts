import { IEmployeeMy } from '@account/classes/response';
import { IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeMyAction {
  GET_REQUEST = '@@account/employee/my/FETCH_REQUEST',
  GET_SUCCESS = '@@account/employee/my/FETCH_SUCCESS',
  GET_ERROR = '@@account/employee/my/FETCH_ERROR',
  GET_DISPOSE = '@@account/employee/my/GET_BY_ID_DISPOSE',
}

export const accountEmployeeMyGetRequest = () => action(AccountEmployeeMyAction.GET_REQUEST);
export const accountEmployeeMyGetSuccess = (data: IResponseSingle<IEmployeeMy>) => action(AccountEmployeeMyAction.GET_SUCCESS, data);
export const accountEmployeeMyGetError = (message: string) => action(AccountEmployeeMyAction.GET_ERROR, message);
export const accountEmployeeMyGetDispose = () => action(AccountEmployeeMyAction.GET_DISPOSE);