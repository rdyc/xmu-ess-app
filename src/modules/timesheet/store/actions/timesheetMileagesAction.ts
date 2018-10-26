import { IResponseCollection } from '@generic/interfaces';
import {
  ITimesheetMileagesGetAllRequest
} from '@timesheet/classes/queries/entry';
import { ITimesheetMileages } from '@timesheet/classes/response';
import { action } from 'typesafe-actions';

export const enum TimesheetMileagesAction {
  GET_ALL_REQUEST = '@@timesheet/mileages/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@timesheet/mileages/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@timesheet/mileages/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@timesheet/mileages/GET_ALL_DISPOSE',
}

// get all
export const timesheetMileagesGetAllRequest = (request: ITimesheetMileagesGetAllRequest) => action(TimesheetMileagesAction.GET_ALL_REQUEST, request);
export const timesheetMileagesGetAllSuccess = (response: IResponseCollection<ITimesheetMileages>) => action(TimesheetMileagesAction.GET_ALL_SUCCESS, response);
export const timesheetMileagesGetAllError = (message: string) => action(TimesheetMileagesAction.GET_ALL_ERROR, message);
export const timesheetMileagesGetAllDispose = () => action(TimesheetMileagesAction.GET_ALL_DISPOSE);