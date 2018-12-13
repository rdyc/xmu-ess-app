import { IResponseCollection } from '@generic/interfaces';
import { ILeaveCalculationGetAllRequest } from '@lookup/classes/queries';
import { ILeaveCalculation } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LeaveCalculationAction {
  GET_ALL_REQUEST = '@@lookup/leave/calculation/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/leave/calculation/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/leave/calculation/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/leave/calculation/GET_ALL_DISPOSE',
 
}

// get all
export const leaveCalculationGetAllRequest = (request: ILeaveCalculationGetAllRequest) => action(LeaveCalculationAction.GET_ALL_REQUEST, request);
export const leaveCalculationGetAllSuccess = (response: IResponseCollection<ILeaveCalculation>) => action(LeaveCalculationAction.GET_ALL_SUCCESS, response);
export const leaveCalculationGetAllError = (message: string) => action(LeaveCalculationAction.GET_ALL_ERROR, message);
export const leaveCalculationGetAllDispose = () => action(LeaveCalculationAction.GET_ALL_DISPOSE);