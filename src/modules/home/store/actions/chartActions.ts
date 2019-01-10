import { IResponseCollection } from '@generic/interfaces';
import { IChartGetAllRequest } from '@home/classes/queries/IChartGetAllRequest';
import { IChart } from '@home/classes/response/IChart';
import { action } from 'typesafe-actions';

export const enum ChartAction {
  GET_ALL_REQUEST = '@@chart/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@chart/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@chart/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@chart/GET_ALL_DISPOSE',
}

// get all
export const chartGetAllRequest = (request: IChartGetAllRequest) => action(ChartAction.GET_ALL_REQUEST, request);
export const chartGetAllSuccess = (response: IResponseCollection<IChart>) => action(ChartAction.GET_ALL_SUCCESS, response);
export const chartGetAllError = (message: string) => action(ChartAction.GET_ALL_ERROR, message);
export const chartGetAllDispose = () => action(ChartAction.GET_ALL_DISPOSE);
