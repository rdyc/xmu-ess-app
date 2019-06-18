import { IResponseCollection } from '@generic/interfaces';
import { ILeaveCalculationGetAllRequest } from '@lookup/classes/queries';
import { ILeaveCalculation } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupLeaveCalculationAction {
  GET_ALL_REQUEST = '@@lookup/calculation/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/calculation/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/calculation/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/calculation/GET_ALL_DISPOSE',
 
}

// get all
export const lookupLeaveCalculationGetAllRequest = (request: ILeaveCalculationGetAllRequest) => action(LookupLeaveCalculationAction.GET_ALL_REQUEST, request);
export const lookupLeaveCalculationGetAllSuccess = (response: IResponseCollection<ILeaveCalculation>) => action(LookupLeaveCalculationAction.GET_ALL_SUCCESS, response);
export const lookupLeaveCalculationGetAllError = (error: any) => action(LookupLeaveCalculationAction.GET_ALL_ERROR, error);
export const lookupLeaveCalculationGetAllDispose = () => action(LookupLeaveCalculationAction.GET_ALL_DISPOSE);