import { IResponseCollection } from '@generic/interfaces';
import { ICalculateLeavePostRequest, ILeaveCalculationGetAllRequest } from '@lookup/classes/queries';
import { ILeaveCalculation, ILookupLeave } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupLeaveCalculationAction {
  GET_ALL_REQUEST = '@@lookup/calculation/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/calculation/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/calculation/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/calculation/GET_ALL_DISPOSE',
  POST_REQUEST = '@@lookup/calculation/POST_REQUEST',
  POST_SUCCESS = '@@lookup/calculation/POST_SUCCESS',
  POST_ERROR = '@@lookup/calculation/POST_ERROR',
  POST_DISPOSE = '@@lookup/calculation/POST_DISPOSE',
  
}

// get all
export const lookupLeaveCalculationGetAllRequest = (request: ILeaveCalculationGetAllRequest) => action(LookupLeaveCalculationAction.GET_ALL_REQUEST, request);
export const lookupLeaveCalculationGetAllSuccess = (response: IResponseCollection<ILeaveCalculation>) => action(LookupLeaveCalculationAction.GET_ALL_SUCCESS, response);
export const lookupLeaveCalculationGetAllError = (error: any) => action(LookupLeaveCalculationAction.GET_ALL_ERROR, error);
export const lookupLeaveCalculationGetAllDispose = () => action(LookupLeaveCalculationAction.GET_ALL_DISPOSE);

// post
export const lookupLeaveCalculationPostRequest = (request: ICalculateLeavePostRequest) => action(LookupLeaveCalculationAction.POST_REQUEST, request);
export const lookupLeaveCalculationPostSuccess = (response: IResponseCollection<ILookupLeave>) => action(LookupLeaveCalculationAction.POST_SUCCESS, response);
export const lookupLeaveCalculationPostError = (error: any) => action(LookupLeaveCalculationAction.POST_ERROR, error);
export const lookupLeaveCalculationPostDispose = () => action(LookupLeaveCalculationAction.POST_DISPOSE);
