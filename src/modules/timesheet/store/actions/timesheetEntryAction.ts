import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ITimesheetGetAllRequest,
  ITimesheetGetByIdRequest,
  ITimesheetPostRequest,
  ITimesheetPutRequest,
} from '@timesheet/classes/queries/entry';
import { ITimesheet, ITimesheetDetail } from '@timesheet/classes/response';
import { action } from 'typesafe-actions';

export const enum TimesheetEntryAction {
  GET_ALL_REQUEST = '@@timesheet/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@timesheet/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@timesheet/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@timesheet/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@timesheet/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@timesheet/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@timesheet/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@timesheet/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@timesheet/POST_REQUEST',
  POST_SUCCESS = '@@timesheet/POST_SUCCESS',
  POST_ERROR = '@@timesheet/POST_ERROR',
  POST_DISPOSE = '@@timesheet/POST_DISPOSE',
  PUT_REQUEST = '@@timesheet/PUT_REQUEST',
  PUT_SUCCESS = '@@timesheet/PUT_SUCCESS',
  PUT_ERROR = '@@timesheet/PUT_ERROR',
  PUT_DISPOSE = '@@timesheet/PUT_DISPOSE',
}

// get all
export const timesheetGetAllRequest = (request: ITimesheetGetAllRequest) => action(TimesheetEntryAction.GET_ALL_REQUEST, request);
export const timesheetGetAllSuccess = (response: IResponseCollection<ITimesheet>) => action(TimesheetEntryAction.GET_ALL_SUCCESS, response);
export const timesheetGetAllError = (message: string) => action(TimesheetEntryAction.GET_ALL_ERROR, message);
export const timesheetGetAllDispose = () => action(TimesheetEntryAction.GET_ALL_DISPOSE);

// get by id
export const timesheetGetByIdRequest = (request: ITimesheetGetByIdRequest) => action(TimesheetEntryAction.GET_BY_ID_REQUEST, request);
export const timesheetGetByIdSuccess = (response: IResponseSingle<ITimesheetDetail>) => action(TimesheetEntryAction.GET_BY_ID_SUCCESS, response);
export const timesheetGetByIdError = (message: string) => action(TimesheetEntryAction.GET_BY_ID_ERROR, message);
export const timesheetGetByIdDispose = () => action(TimesheetEntryAction.GET_BY_ID_DISPOSE);

// post
export const timesheetPostRequest = (request: ITimesheetPostRequest) => action(TimesheetEntryAction.POST_REQUEST, request);
export const timesheetPostSuccess = (response: IResponseSingle<ITimesheet>) => action(TimesheetEntryAction.POST_SUCCESS, response);
export const timesheetPostError = (message: string) => action(TimesheetEntryAction.POST_ERROR, message);
export const timesheetPostDispose = () => action(TimesheetEntryAction.POST_DISPOSE);

// put
export const timesheetPutRequest = (request: ITimesheetPutRequest) => action(TimesheetEntryAction.PUT_REQUEST, request);
export const timesheetPutSuccess = (response: IResponseSingle<ITimesheet>) => action(TimesheetEntryAction.PUT_SUCCESS, response);
export const timesheetPutError = (message: string) => action(TimesheetEntryAction.PUT_ERROR, message);
export const timesheetPutDispose = () => action(TimesheetEntryAction.PUT_DISPOSE);