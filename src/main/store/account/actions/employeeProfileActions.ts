import { action } from 'typesafe-actions';
import { EmployeeProfileType } from '../types/EmployeeProfileType';
import { EmployeeQueryType, EmployeeCommandType } from '../types/EmployeeParameterType';

export const enum EmployeeProfileAction {
  FETCH_REQUEST = '@@employee-profile/FETCH_REQUEST',
  FETCH_SUCCESS = '@@employee-profile/FETCH_SUCCESS',
  FETCH_ERROR = '@@employee-profile/FETCH_ERROR',

  COMMAND_REQUEST = '@@employee-profile/COMMAND_REQUEST',
  COMMAND_SUCCESS = '@@employee-profile/COMMAND_SUCCESS',
  COMMAND_ERROR = '@@employee-profile/COMMAND_ERROR'
}

export const EmployeeProfileFetchRequest = (params: EmployeeQueryType) => action(EmployeeProfileAction.FETCH_REQUEST, params);
export const EmployeeProfileFetchSuccess = (data: EmployeeProfileType) => action(EmployeeProfileAction.FETCH_SUCCESS, data);
export const EmployeeProfileFetchError = (message: string) => action(EmployeeProfileAction.FETCH_ERROR, message);

export const EmployeeProfileCommandRequest = (params: EmployeeCommandType) => action(EmployeeProfileAction.COMMAND_REQUEST, params);
export const EmployeeProfileCommandSuccess = (data: EmployeeProfileType) => action(EmployeeProfileAction.COMMAND_SUCCESS, data);
export const EmployeeProfileCommandError = (message: string) => action(EmployeeProfileAction.COMMAND_ERROR, message);