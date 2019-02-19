import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ITimesheetApprovalGetAllRequest, ITimesheetApprovalGetByIdRequest
} from '@timesheet/classes/queries/approval';
import { ITimesheet, ITimesheetDetail } from '@timesheet/classes/response';
import { action } from 'typesafe-actions';

export const enum TimesheetApprovalHistoryAction {
  GET_ALL_REQUEST = '@@timesheet/approval/history/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@timesheet/approval/history/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@timesheet/approval/history/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@timesheet/approval/history/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@timesheet/approval/history/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@timesheet/approval/history/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@timesheet/approval/history/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@timesheet/approval/history/GET_BY_ID_DISPOSE',
}

// get all
export const timesheetApprovalHistoryGetAllRequest = (request: ITimesheetApprovalGetAllRequest) => action(TimesheetApprovalHistoryAction.GET_ALL_REQUEST, request);
export const timesheetApprovalHistoryGetAllSuccess = (response: IResponseCollection<ITimesheet>) => action(TimesheetApprovalHistoryAction.GET_ALL_SUCCESS, response);
export const timesheetApprovalHistoryGetAllError = (error: any) => action(TimesheetApprovalHistoryAction.GET_ALL_ERROR, error);
export const timesheetApprovalHistoryGetAllDispose = () => action(TimesheetApprovalHistoryAction.GET_ALL_DISPOSE);

// get by id
export const timesheetApprovalHistoryGetByIdRequest = (request: ITimesheetApprovalGetByIdRequest) => action(TimesheetApprovalHistoryAction.GET_BY_ID_REQUEST, request);
export const timesheetApprovalHistoryGetByIdSuccess = (response: IResponseSingle<ITimesheetDetail>) => action(TimesheetApprovalHistoryAction.GET_BY_ID_SUCCESS, response);
export const timesheetApprovalHistoryGetByIdError = (error: any) => action(TimesheetApprovalHistoryAction.GET_BY_ID_ERROR, error);
export const timesheetApprovalHistoryGetByIdDispose = () => action(TimesheetApprovalHistoryAction.GET_BY_ID_DISPOSE);