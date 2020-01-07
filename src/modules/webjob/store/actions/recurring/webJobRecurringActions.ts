import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { 
  IWebJobRecurringDeleteRequest, 
  IWebJobRecurringGetAllRequest,
  IWebJobRecurringGetDetailRequest,
  IWebJobRecurringPostRequest, 
  IWebJobRecurringPutRequest,
  IWebJobRecurringTriggerRequest
} from '@webjob/classes/queries';
import { 
  IWebJobRecurring, 
  IWebJobRecurringDetail,
} from '@webjob/classes/response';
import { action } from 'typesafe-actions';

export const enum WebJobRecurringAction {
  GET_ALL_REQUEST = '@@webjob/recurring/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@webjob/recurring/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@webjob/recurring/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@webjob/recurring/GET_ALL_DISPOSE',
  GET_BY_ID_REQUEST = '@@webjob/recurring/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@webjob/recurring/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@webjob/recurring/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@webjob/recurring/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@webjob/recurring/POST_REQUEST',
  POST_SUCCESS = '@@webjob/recurring/POST_SUCCESS',
  POST_ERROR = '@@webjob/recurring/POST_ERROR',
  POST_DISPOSE = '@@webjob/recurring/POST_DISPOSE',
  PUT_REQUEST = '@@webjob/recurring/PUT_REQUEST',
  PUT_SUCCESS = '@@webjob/recurring/PUT_SUCCESS',
  PUT_ERROR = '@@webjob/recurring/PUT_ERROR',
  PUT_DISPOSE = '@@webjob/recurring/PUT_DISPOSE',
  TRIGGER_REQUEST = '@@webjob/recurring/TRIGGER_REQUEST',
  TRIGGER_SUCCESS = '@@webjob/recurring/TRIGGER_SUCCESS',
  TRIGGER_ERROR = '@@webjob/recurring/TRIGGER_ERROR',
  TRIGGER_DISPOSE = '@@webjob/recurring/TRIGGER_DISPOSE',
  DELETE_REQUEST = '@@webjob/recurring/DELETE_REQUEST',
  DELETE_SUCCESS = '@@webjob/recurring/DELETE_SUCCESS',
  DELETE_ERROR = '@@webjob/recurring/DELETE_ERROR',
  DELETE_DISPOSE = '@@webjob/recurring/DELETE_DISPOSE',
}

// get all
export const webJobRecurringGetAllRequest = (request: IWebJobRecurringGetAllRequest) => action(WebJobRecurringAction.GET_ALL_REQUEST, request);
export const webJobRecurringGetAllSuccess = (response: IResponseCollection<IWebJobRecurring>) => action(WebJobRecurringAction.GET_ALL_SUCCESS, response);
export const webJobRecurringGetAllError = (error: any) => action(WebJobRecurringAction.GET_ALL_ERROR, error);
export const webJobRecurringGetAllDispose = () => action(WebJobRecurringAction.GET_ALL_DISPOSE);

// get by id
export const webJobRecurringGetByIdRequest = (request: IWebJobRecurringGetDetailRequest) => action(WebJobRecurringAction.GET_BY_ID_REQUEST, request);
export const webJobRecurringGetByIdSuccess = (response: IResponseSingle<IWebJobRecurringDetail>) => action(WebJobRecurringAction.GET_BY_ID_SUCCESS, response);
export const webJobRecurringGetByIdError = (error: any) => action(WebJobRecurringAction.GET_BY_ID_ERROR, error);
export const webJobRecurringGetByIdDispose = () => action(WebJobRecurringAction.GET_BY_ID_DISPOSE);

// post
export const webJobRecurringPostRequest = (request: IWebJobRecurringPostRequest) => action(WebJobRecurringAction.POST_REQUEST, request);
export const webJobRecurringPostSuccess = (response: IResponseSingle<IWebJobRecurring>) => action(WebJobRecurringAction.POST_SUCCESS, response);
export const webJobRecurringPostError = (error: any) => action(WebJobRecurringAction.POST_ERROR, error);
export const webJobRecurringPostDispose = () => action(WebJobRecurringAction.POST_DISPOSE);

// put
export const webJobRecurringPutRequest = (request: IWebJobRecurringPutRequest) => action(WebJobRecurringAction.PUT_REQUEST, request);
export const webJobRecurringPutSuccess = (response: IResponseSingle<IWebJobRecurring>) => action(WebJobRecurringAction.PUT_SUCCESS, response);
export const webJobRecurringPutError = (error: any) => action(WebJobRecurringAction.PUT_ERROR, error);
export const webJobRecurringPutDispose = () => action(WebJobRecurringAction.PUT_DISPOSE);

// delete
export const webJobRecurringDeleteRequest = (request: IWebJobRecurringDeleteRequest) => action(WebJobRecurringAction.DELETE_REQUEST, request);
export const webJobRecurringDeleteSuccess = () => action(WebJobRecurringAction.DELETE_SUCCESS);
export const webJobRecurringDeleteError = (error: any) => action(WebJobRecurringAction.DELETE_ERROR, error);
export const webJobRecurringDeleteDispose = () => action(WebJobRecurringAction.DELETE_DISPOSE);

// trigger
export const webJobRecurringTriggerRequest = (request: IWebJobRecurringTriggerRequest) => action(WebJobRecurringAction.TRIGGER_REQUEST, request);
export const webJobRecurringTriggerSuccess = () => action(WebJobRecurringAction.TRIGGER_SUCCESS);
export const webJobRecurringTriggerError = (error: any) => action(WebJobRecurringAction.TRIGGER_ERROR, error);
export const webJobRecurringTriggerDispose = () => action(WebJobRecurringAction.TRIGGER_DISPOSE);