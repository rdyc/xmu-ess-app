import { IEmployeeLeaveByIdRequest } from '@account/classes/queries';
import { IEmployeeLeave } from '@account/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum AccountEmployeeLeaveAction {
  GET_BY_ID_REQUEST = '@@account/employee/leave/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@account/employee/leave/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@account/employee//leaveGET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@account/employee/leave/GET_BY_ID_DISPOSE',
}

// get by id
export const accountEmployeeLeaveGetByIdRequest = (request: IEmployeeLeaveByIdRequest) => action(AccountEmployeeLeaveAction.GET_BY_ID_REQUEST, request);
export const accountEmployeeLeaveGetByIdSuccess = (response: IResponseCollection<IEmployeeLeave>) => action(AccountEmployeeLeaveAction.GET_BY_ID_SUCCESS, response);
export const accountEmployeeLeaveGetByIdError = (message: string) => action(AccountEmployeeLeaveAction.GET_BY_ID_ERROR, message);
export const accountEmployeeLeaveGetByIdDispose = () => action(AccountEmployeeLeaveAction.GET_BY_ID_DISPOSE);