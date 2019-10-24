import {
  ISummaryGetBillableRequest,
  ISummaryGetEffectivenessRequest,
  ISummaryGetMappingRequest,
  ISummaryGetProfitabilityRequest,
  ISummaryGetProgressRequest,
  ISummaryGetWinningRequest
} from '@summary/classes/queries';
import { ISummaryBillable } from '@summary/classes/response/billable';
import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { ISummaryMapping } from '@summary/classes/response/mapping';
import { ISummaryProfitability } from '@summary/classes/response/profitability';
import { ISummaryProgress } from '@summary/classes/response/progress';
import { ISummaryWinning } from '@summary/classes/response/winning';

import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum SummaryAction {
  GET_BILLABLE_REQUEST = '@@summary/GET_BILLABLE_REQUEST',
  GET_BILLABLE_SUCCESS = '@@summary/GET_BILLABLE_SUCCESS',
  GET_BILLABLE_ERROR = '@@summary/GET_BILLABLE_ERROR',
  GET_BILLABLE_DISPOSE = '@@summary/GET_BILLABLE_DISPOSE',
  
  GET_EFFECTIVENESS_REQUEST = '@@summary/GET_EFFECTIVENESS_REQUEST',
  GET_EFFECTIVENESS_SUCCESS = '@@summary/GET_EFFECTIVENESS_SUCCESS',
  GET_EFFECTIVENESS_ERROR = '@@summary/GET_EFFECTIVENESS_ERROR',
  GET_EFFECTIVENESS_DISPOSE = '@@summary/GET_EFFECTIVENESS_DISPOSE',
  
  GET_PROFITABILITY_REQUEST = '@@summary/GET_PROFITABILITY_REQUEST',
  GET_PROFITABILITY_SUCCESS = '@@summary/GET_PROFITABILITY_SUCCESS',
  GET_PROFITABILITY_ERROR = '@@summary/GET_PROFITABILITY_ERROR',
  GET_PROFITABILITY_DISPOSE = '@@summary/GET_PROFITABILITY_DISPOSE',
  
  GET_PROGRESS_REQUEST = '@@summary/GET_PROGRESS_REQUEST',
  GET_PROGRESS_SUCCESS = '@@summary/GET_PROGRESS_SUCCESS',
  GET_PROGRESS_ERROR = '@@summary/GET_PROGRESS_ERROR',
  GET_PROGRESS_DISPOSE = '@@summary/GET_PROGRESS_DISPOSE',
  
  GET_WINNING_REQUEST = '@@summary/GET_WINNING_REQUEST',
  GET_WINNING_SUCCESS = '@@summary/GET_WINNING_SUCCESS',
  GET_WINNING_ERROR = '@@summary/GET_WINNING_ERROR',
  GET_WINNING_DISPOSE = '@@summary/GET_WINNING_DISPOSE',

  GET_MAPPING_REQUEST = '@@summary/GET_MAPPING_REQUEST',
  GET_MAPPING_SUCCESS = '@@summary/GET_MAPPING_SUCCESS',
  GET_MAPPING_ERROR = '@@summary/GET_MAPPING_ERROR',
  GET_MAPPING_DISPOSE = '@@summary/GET_MAPPING_DISPOSE',
}

// get billable
export const summaryGetBillableRequest = (request: ISummaryGetBillableRequest) => action(SummaryAction.GET_BILLABLE_REQUEST, request);
export const summaryGetBillableSuccess = (response: IResponseCollection<ISummaryBillable>) => action(SummaryAction.GET_BILLABLE_SUCCESS, response);
export const summaryGetBillableError = (message: string) => action(SummaryAction.GET_BILLABLE_ERROR, message);
export const summaryGetBillableDispose = () => action(SummaryAction.GET_BILLABLE_DISPOSE);

// get effectiveness
export const summaryGetEffectivenessRequest = (request: ISummaryGetEffectivenessRequest) => action(SummaryAction.GET_EFFECTIVENESS_REQUEST, request);
export const summaryGetEffectivenessSuccess = (response: IResponseCollection<ISummaryEffectiveness>) => action(SummaryAction.GET_EFFECTIVENESS_SUCCESS, response);
export const summaryGetEffectivenessError = (message: string) => action(SummaryAction.GET_EFFECTIVENESS_ERROR, message);
export const summaryGetEffectivenessDispose = () => action(SummaryAction.GET_EFFECTIVENESS_DISPOSE);

// get profitability
export const summaryGetProfitabilityRequest = (request: ISummaryGetProfitabilityRequest) => action(SummaryAction.GET_PROFITABILITY_REQUEST, request);
export const summaryGetProfitabilitySuccess = (response: IResponseSingle<ISummaryProfitability>) => action(SummaryAction.GET_PROFITABILITY_SUCCESS, response);
export const summaryGetProfitabilityError = (message: string) => action(SummaryAction.GET_PROFITABILITY_ERROR, message);
export const summaryGetProfitabilityDispose = () => action(SummaryAction.GET_PROFITABILITY_DISPOSE);

// get progress
export const summaryGetProgressRequest = (request: ISummaryGetProgressRequest) => action(SummaryAction.GET_PROGRESS_REQUEST, request);
export const summaryGetProgressSuccess = (response: IResponseSingle<ISummaryProgress>) => action(SummaryAction.GET_PROGRESS_SUCCESS, response);
export const summaryGetProgressError = (message: string) => action(SummaryAction.GET_PROGRESS_ERROR, message);
export const summaryGetProgressDispose = () => action(SummaryAction.GET_PROGRESS_DISPOSE);

// get winning
export const summaryGetWinningRequest = (request: ISummaryGetWinningRequest) => action(SummaryAction.GET_WINNING_REQUEST, request);
export const summaryGetWinningSuccess = (response: IResponseCollection<ISummaryWinning>) => action(SummaryAction.GET_WINNING_SUCCESS, response);
export const summaryGetWinningError = (message: string) => action(SummaryAction.GET_WINNING_ERROR, message);
export const summaryGetWinningDispose = () => action(SummaryAction.GET_WINNING_DISPOSE);

// get mapping
export const summaryGetMappingRequest = (request: ISummaryGetMappingRequest) => action(SummaryAction.GET_MAPPING_REQUEST, request);
export const summaryGetMappingSuccess = (response: IResponseCollection<ISummaryMapping>) => action(SummaryAction.GET_MAPPING_SUCCESS, response);
export const summaryGetMappingError = (message: string) => action(SummaryAction.GET_MAPPING_ERROR, message);
export const summaryGetMappingDispose = () => action(SummaryAction.GET_MAPPING_DISPOSE);