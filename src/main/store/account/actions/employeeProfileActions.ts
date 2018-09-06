import { action } from 'typesafe-actions';
import { EmployeeProfileType } from '../types/EmployeeProfileType';
import { EmployeeParameterType } from '../types/EmployeeParameterType';

export const enum EmployeeProfileAction {
  FETCH_REQUEST = '@@employee-profile/FETCH_REQUEST',
  FETCH_SUCCESS = '@@employee-profile/FETCH_SUCCESS',
  FETCH_ERROR = '@@employee-profile/FETCH_ERROR',
}

export const EmployeeProfileFetchRequest = (params: EmployeeParameterType) => action(EmployeeProfileAction.FETCH_REQUEST, params);
export const EmployeeProfileFetchSuccess = (data: EmployeeProfileType) => action(EmployeeProfileAction.FETCH_SUCCESS, data);
export const EmployeeProfileFetchError = (message: string) => action(EmployeeProfileAction.FETCH_ERROR, message);