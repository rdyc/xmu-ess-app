import { IEmployeeCommand, IEmployeeQuery } from '@account/classes';
import { IEmployee } from '@account/classes/response';
import { action } from 'typesafe-actions';

export const enum EmployeeProfileAction {
  FETCH_REQUEST = '@@employee-profile/FETCH_REQUEST',
  FETCH_SUCCESS = '@@employee-profile/FETCH_SUCCESS',
  FETCH_ERROR = '@@employee-profile/FETCH_ERROR',

  COMMAND_REQUEST = '@@employee-profile/COMMAND_REQUEST',
  COMMAND_SUCCESS = '@@employee-profile/COMMAND_SUCCESS',
  COMMAND_ERROR = '@@employee-profile/COMMAND_ERROR'
}

export const EmployeeProfileFetchRequest = (params: IEmployeeQuery) => action(EmployeeProfileAction.FETCH_REQUEST, params);
export const EmployeeProfileFetchSuccess = (data: IEmployee) => action(EmployeeProfileAction.FETCH_SUCCESS, data);
export const EmployeeProfileFetchError = (error: string) => action(EmployeeProfileAction.FETCH_ERROR, error);

export const EmployeeProfileCommandRequest = (params: IEmployeeCommand) => action(EmployeeProfileAction.COMMAND_REQUEST, params);
export const EmployeeProfileCommandSuccess = (data: IEmployee) => action(EmployeeProfileAction.COMMAND_SUCCESS, data);
export const EmployeeProfileCommandError = (error: string) => action(EmployeeProfileAction.COMMAND_ERROR, error);