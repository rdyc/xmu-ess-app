import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { ILookupHolidayGetAllRequest, ILookupHolidayGetByIdRequest, ILookupHolidayGetListRequest, ILookupHolidayPostRequest, ILookupHolidayPutRequest } from '@lookup/classes/queries';
import { ILookupHoliday, ILookupHolidayDetail, ILookupHolidayList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupHolidayAction {
  GET_ALL_REQUEST = '@@holiday/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@holiday/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@holiday/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@holiday/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@holiday/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@holiday/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@holiday/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@holiday/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@holiday/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@holiday/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@holiday/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@holiday/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@holiday/POST_REQUEST',
  POST_SUCCESS = '@@holiday/POST_SUCCESS',
  POST_ERROR = '@@holiday/POST_ERROR',
  POST_DISPOSE = '@@holiday/POST_DISPOSE',
  PUT_REQUEST = '@@holiday/PUT_REQUEST',
  PUT_SUCCESS = '@@holiday/PUT_SUCCESS',
  PUT_ERROR = '@@holiday/PUT_ERROR',
  PUT_DISPOSE = '@@holiday/PUT_DISPOSE',
}

// get all
export const lookupHolidayGetAllRequest = (request: ILookupHolidayGetAllRequest) => action(LookupHolidayAction.GET_ALL_REQUEST, request);
export const lookupHolidayGetAllSuccess = (response: IResponseCollection<ILookupHoliday>) => action(LookupHolidayAction.GET_ALL_SUCCESS, response);
export const lookupHolidayGetAllError = (message: string) => action(LookupHolidayAction.GET_ALL_ERROR, message);
export const lookupHolidayGetAllDispose = () => action(LookupHolidayAction.GET_ALL_DISPOSE);

// get list
export const lookupHolidayGetListRequest = (request: ILookupHolidayGetListRequest) => action(LookupHolidayAction.GET_LIST_REQUEST, request);
export const lookupHolidayGetListSuccess = (response: IResponseCollection<ILookupHolidayList>) => action(LookupHolidayAction.GET_LIST_SUCCESS, response);
export const lookupHolidayGetListError = (message: string) => action(LookupHolidayAction.GET_LIST_ERROR, message);
export const lookupHolidayGetListDispose = () => action(LookupHolidayAction.GET_LIST_DISPOSE);

// get by id
export const lookupHolidayGetByIdRequest = (request: ILookupHolidayGetByIdRequest) => action(LookupHolidayAction.GET_BY_ID_REQUEST, request);
export const lookupHolidayGetByIdSuccess = (response: IResponseSingle<ILookupHolidayDetail>) => action(LookupHolidayAction.GET_BY_ID_SUCCESS, response);
export const lookupHolidayGetByIdError = (message: string) => action(LookupHolidayAction.GET_BY_ID_ERROR, message);
export const lookupHolidayGetByIdDispose = () => action(LookupHolidayAction.GET_BY_ID_DISPOSE);

// post
export const lookupHolidayPostRequest = (request: ILookupHolidayPostRequest) => action(LookupHolidayAction.POST_REQUEST, request);
export const lookupHolidayPostSuccess = (response: IResponseSingle<ILookupHoliday>) => action(LookupHolidayAction.POST_SUCCESS, response);
export const lookupHolidayPostError = (message: string) => action(LookupHolidayAction.POST_ERROR, message);
export const lookupHolidayPostDispose = () => action(LookupHolidayAction.POST_DISPOSE);

// put
export const lookupHolidayPutRequest = (request: ILookupHolidayPutRequest) => action(LookupHolidayAction.PUT_REQUEST, request);
export const lookupHolidayPutSuccess = (response: IResponseSingle<ILookupHoliday>) => action(LookupHolidayAction.PUT_SUCCESS, response);
export const lookupHolidayPutError = (message: string) => action(LookupHolidayAction.PUT_ERROR, message);
export const lookupHolidayPutDispose = () => action(LookupHolidayAction.PUT_DISPOSE);