import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ITimesheetApprovalGetAllRequest, ITimesheetApprovalGetByIdRequest, ITimesheetApprovalPostBulkRequest, ITimesheetApprovalPostRequest,
} from '@timesheet/classes/queries/approval';
import { ITimesheet, ITimesheetDetail } from '@timesheet/classes/response';
import { action } from 'typesafe-actions';

export const enum TimesheetApprovalAction {
  GET_ALL_REQUEST = '@@timesheet/approval/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@timesheet/approval/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@timesheet/approval/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@timesheet/approval/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@timesheet/approval/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@timesheet/approval/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@timesheet/approval/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@timesheet/approval/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@timesheet/approval/POST_REQUEST',
  POST_SUCCESS = '@@timesheet/approval/POST_SUCCESS',
  POST_ERROR = '@@timesheet/approval/POST_ERROR',
  POST_DISPOSE = '@@timesheet/approval/POST_DISPOSE',
  POST_BULK_REQUEST = '@@timesheet/approval/POST_BULK_REQUEST',
  POST_BULK_SUCCESS = '@@timesheet/approval/POST_BULK_SUCCESS',
  POST_BULK_ERROR = '@@timesheet/approval/POST_BULK_ERROR',
  POST_BULK_DISPOSE = '@@timesheet/approval/POST_BULK_DISPOSE',
}

// get all
export const timesheetApprovalGetAllRequest = (request: ITimesheetApprovalGetAllRequest) => action(TimesheetApprovalAction.GET_ALL_REQUEST, request);
export const timesheetApprovalGetAllSuccess = (response: IResponseCollection<ITimesheet>) => action(TimesheetApprovalAction.GET_ALL_SUCCESS, response);
export const timesheetApprovalGetAllError = (message: string) => action(TimesheetApprovalAction.GET_ALL_ERROR, message);
export const timesheetApprovalGetAllDispose = () => action(TimesheetApprovalAction.GET_ALL_DISPOSE);

// get by id
export const timesheetApprovalGetByIdRequest = (request: ITimesheetApprovalGetByIdRequest) => action(TimesheetApprovalAction.GET_BY_ID_REQUEST, request);
export const timesheetApprovalGetByIdSuccess = (response: IResponseSingle<ITimesheetDetail>) => action(TimesheetApprovalAction.GET_BY_ID_SUCCESS, response);
export const timesheetApprovalGetByIdError = (message: string) => action(TimesheetApprovalAction.GET_BY_ID_ERROR, message);
export const timesheetApprovalGetByIdDispose = () => action(TimesheetApprovalAction.GET_BY_ID_DISPOSE);

// post
export const timesheetApprovalPostRequest =  (request: ITimesheetApprovalPostRequest) => action(TimesheetApprovalAction.POST_REQUEST, request);
export const timesheetApprovalPostSuccess = (response: boolean) => action(TimesheetApprovalAction.POST_SUCCESS, response);
export const timesheetApprovalPostError = (message: string) => action(TimesheetApprovalAction.POST_ERROR, message);
export const timesheetApprovalPostDispose = () => action(TimesheetApprovalAction.POST_DISPOSE);

// post bulk
export const timesheetApprovalPostBulkRequest = (request: ITimesheetApprovalPostBulkRequest) => action (TimesheetApprovalAction.POST_BULK_REQUEST, request);
export const timesheetApprovalPostBulkSuccess = (response: boolean) => action (TimesheetApprovalAction.POST_BULK_SUCCESS, response);
export const timesheetApprovalPostBulkError = (message: string) => action(TimesheetApprovalAction.POST_BULK_ERROR, message);
export const timesheetApprovalPostBulkDispose = () => action(TimesheetApprovalAction.POST_BULK_DISPOSE);