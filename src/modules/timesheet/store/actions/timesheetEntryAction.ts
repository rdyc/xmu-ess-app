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
  GET_ALL_REQUEST = '@@timesheet/entry/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@timesheet/entry/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@timesheet/entry/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@timesheet/entry/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@timesheet/entry/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@timesheet/entry/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@timesheet/entry/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@timesheet/entry/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@timesheet/entry/POST_REQUEST',
  POST_SUCCESS = '@@timesheet/entry/POST_SUCCESS',
  POST_ERROR = '@@timesheet/entry/POST_ERROR',
  POST_DISPOSE = '@@timesheet/entry/POST_DISPOSE',
  PUT_REQUEST = '@@timesheet/entry/PUT_REQUEST',
  PUT_SUCCESS = '@@timesheet/entry/PUT_SUCCESS',
  PUT_ERROR = '@@timesheet/entry/PUT_ERROR',
  PUT_DISPOSE = '@@timesheet/entry/PUT_DISPOSE',
}

// get all
export const timesheetEntryGetAllRequest = (request: ITimesheetGetAllRequest) => action(TimesheetEntryAction.GET_ALL_REQUEST, request);
export const timesheetEntryGetAllSuccess = (response: IResponseCollection<ITimesheet>) => action(TimesheetEntryAction.GET_ALL_SUCCESS, response);
export const timesheetEntryGetAllError = (error: any) => action(TimesheetEntryAction.GET_ALL_ERROR, error);
export const timesheetEntryGetAllDispose = () => action(TimesheetEntryAction.GET_ALL_DISPOSE);

// get by id
export const timesheetEntryGetByIdRequest = (request: ITimesheetGetByIdRequest) => action(TimesheetEntryAction.GET_BY_ID_REQUEST, request);
export const timesheetEntryGetByIdSuccess = (response: IResponseSingle<ITimesheetDetail>) => action(TimesheetEntryAction.GET_BY_ID_SUCCESS, response);
export const timesheetEntryGetByIdError = (error: any) => action(TimesheetEntryAction.GET_BY_ID_ERROR, error);
export const timesheetEntryGetByIdDispose = () => action(TimesheetEntryAction.GET_BY_ID_DISPOSE);

// post
export const timesheetEntryPostRequest = (request: ITimesheetPostRequest) => action(TimesheetEntryAction.POST_REQUEST, request);
export const timesheetEntryPostSuccess = (response: IResponseSingle<ITimesheet>) => action(TimesheetEntryAction.POST_SUCCESS, response);
export const timesheetEntryPostError = (error: any) => action(TimesheetEntryAction.POST_ERROR, error);
export const timesheetEntryPostDispose = () => action(TimesheetEntryAction.POST_DISPOSE);

// put
export const timesheetEntryPutRequest = (request: ITimesheetPutRequest) => action(TimesheetEntryAction.PUT_REQUEST, request);
export const timesheetEntryPutSuccess = (response: IResponseSingle<ITimesheet>) => action(TimesheetEntryAction.PUT_SUCCESS, response);
export const timesheetEntryPutError = (error: any) => action(TimesheetEntryAction.PUT_ERROR, error);
export const timesheetEntryPutDispose = () => action(TimesheetEntryAction.PUT_DISPOSE);