import {  IResponseSingle } from '@generic/interfaces';
import { IEmployeeFinalGetDetailRequest } from '@profile/classes/queries';
import { IEmployeeFinalDetail } from '@profile/classes/response';
import { action } from 'typesafe-actions';

export const enum EmployeeFinalAction {
  GET_BY_ID_REQUEST = '@@myprofile/employeefinal/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@myprofile/employeefinal/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@myprofile/employeefinal/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@myprofile/employeefinal/GET_BY_ID_DISPOSE',
}

// get by id
export const employeeFinalGetDetailRequest = (request: IEmployeeFinalGetDetailRequest) => action(EmployeeFinalAction.GET_BY_ID_REQUEST, request);
export const employeeFinalGetDetailSuccess = (response: IResponseSingle<IEmployeeFinalDetail>) => action(EmployeeFinalAction.GET_BY_ID_SUCCESS, response);
export const employeeFinalGetDetailError = (error: any) => action(EmployeeFinalAction.GET_BY_ID_ERROR, error);
export const employeeFinalGetDetailDispose = () => action(EmployeeFinalAction.GET_BY_ID_DISPOSE);