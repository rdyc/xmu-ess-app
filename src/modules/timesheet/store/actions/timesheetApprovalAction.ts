import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import {
  ITimesheetApprovalGetAllRequest, ITimesheetApprovalGetByIdRequest,
} from '@timesheet/classes/queries';
import { ITimesheet, ITimesheetDetail } from '@timesheet/classes/response';
import { action } from 'typesafe-actions';

export const enum TimesheetApprovalAction {
  APPROVAL_GET_ALL_REQUEST = '@@timesheet/approval/APPROVAL_GET_ALL_REQUEST',
  APPROVAL_GET_ALL_SUCCESS = '@@timesheet/approval/APPROVAL_GET_ALL_SUCCESS',
  APPROVAL_GET_ALL_ERROR = '@@timesheet/approval/APPROVAL_GET_ALL_ERROR',
  APPROVAL_GET_ALL_DISPOSE = '@@timesheet/approval/APPROVAL_GET_ALL_DISPOSE',
  APPROVAL_GET_BY_ID_REQUEST = '@@timesheet/approval/APPROVAL_GET_BY_ID_REQUEST',
  APPROVAL_GET_BY_ID_SUCCESS = '@@timesheet/approval/APPROVAL_GET_BY_ID_SUCCESS',
  APPROVAL_GET_BY_ID_ERROR = '@@timesheet/approval/APPROVAL_GET_BY_ID_ERROR',
  APPROVAL_GET_BY_ID_DISPOSE = '@@timesheet/approval/APPROVAL_GET_BY_ID_DISPOSE',
  APPROVAL_POST_REQUEST = '@@timesheet/approval/APPROVAL_POST_REQUEST',
  APPROVAL_POST_SUCCESS = '@@timesheet/approval/APPROVAL_POST_SUCCESS',
  APPROVAL_POST_ERROR = '@@timesheet/approval/APPROVAL_POST_ERROR',
  APPROVAL_POST_DISPOSE = '@@timesheet/approval/APPROVAL_POST_DISPOSE',
}

// get all
export const timesheetApprovalGetAllRequest = (request: ITimesheetApprovalGetAllRequest) => action(TimesheetApprovalAction.APPROVAL_GET_ALL_REQUEST, request);
export const timesheetApprovalGetAllSuccess = (response: IResponseCollection<ITimesheet>) => action(TimesheetApprovalAction.APPROVAL_GET_ALL_SUCCESS, response);
export const timesheetApprovalGetAllError = (message: string) => action(TimesheetApprovalAction.APPROVAL_GET_ALL_ERROR, message);
export const timesheetApprovalGetAllDispose = () => action(TimesheetApprovalAction.APPROVAL_GET_ALL_DISPOSE);

// get by id
export const timesheetApprovalGetByIdRequest = (request: ITimesheetApprovalGetByIdRequest) => action(TimesheetApprovalAction.APPROVAL_GET_BY_ID_REQUEST, request);
export const timesheetApprovalGetByIdSuccess = (response: IResponseSingle<ITimesheetDetail>) => action(TimesheetApprovalAction.APPROVAL_GET_BY_ID_SUCCESS, response);
export const timesheetApprovalGetByIdError = (message: string) => action(TimesheetApprovalAction.APPROVAL_GET_BY_ID_ERROR, message);
export const timesheetApprovalGetByIdDispose = () => action(TimesheetApprovalAction.APPROVAL_GET_BY_ID_DISPOSE);