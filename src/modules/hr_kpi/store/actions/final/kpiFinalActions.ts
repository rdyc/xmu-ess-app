import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IKPIFinalGetAllRequest, 
  IKPIFinalGetByIdRequest, 
} from '@kpi/classes/queries/final';
import { IKPIFinal, IKPIFinalDetail } from '@kpi/classes/response/final';
import { action } from 'typesafe-actions';

export const enum KPIFinalAction {
  GET_ALL_REQUEST = '@@kpi/final/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@kpi/final/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@kpi/final/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@kpi/final/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@kpi/final/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@kpi/final/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@kpi/final/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@kpi/final/GET_BY_ID_DISPOSE',
}

// get all
export const KPIFinalGetAllRequest = (request: IKPIFinalGetAllRequest) => action(KPIFinalAction.GET_ALL_REQUEST, request);
export const KPIFinalGetAllSuccess = (response: IResponseCollection<IKPIFinal>) => action(KPIFinalAction.GET_ALL_SUCCESS, response);
export const KPIFinalGetAllError = (error: any) => action(KPIFinalAction.GET_ALL_ERROR, error);
export const KPIFinalGetAllDispose = () => action(KPIFinalAction.GET_ALL_DISPOSE);

// get by id
export const KPIFinalGetByIdRequest = (request: IKPIFinalGetByIdRequest) => action(KPIFinalAction.GET_BY_ID_REQUEST, request);
export const KPIFinalGetByIdSuccess = (response: IResponseSingle<IKPIFinalDetail>) => action(KPIFinalAction.GET_BY_ID_SUCCESS, response);
export const KPIFinalGetByIdError = (error: any) => action(KPIFinalAction.GET_BY_ID_ERROR, error);
export const KPIFinalGetByIdDispose = () => action(KPIFinalAction.GET_BY_ID_DISPOSE);