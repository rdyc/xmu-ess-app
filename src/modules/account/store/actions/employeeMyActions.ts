import { IEmployeeMy } from '@account/classes';
import { action } from 'typesafe-actions';

export const enum EmployeeMyAction {
  FETCH_REQUEST = '@@employee-my/FETCH_REQUEST',
  FETCH_SUCCESS = '@@employee-my/FETCH_SUCCESS',
  FETCH_ERROR = '@@employee-my/FETCH_ERROR',
}

export const EmployeeFetchRequest = () => action(EmployeeMyAction.FETCH_REQUEST);
export const EmployeeFetchSuccess = (data: IEmployeeMy) => action(EmployeeMyAction.FETCH_SUCCESS, data);
export const EmployeeFetchError = (message: string) => action(EmployeeMyAction.FETCH_ERROR, message);