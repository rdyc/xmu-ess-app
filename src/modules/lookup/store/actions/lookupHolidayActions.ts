import { IResponseCollection, IResponseSingle } from '@generic/interfaces';
import { ILookupHolidayDeleteRequest, ILookupHolidayGetAllRequest, ILookupHolidayGetByIdRequest, ILookupHolidayGetListRequest, ILookupHolidayPostRequest, ILookupHolidayPutRequest } from '@lookup/classes/queries';
import { ILookupHoliday, ILookupHolidayDetail, ILookupHolidayList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum LookupHolidayAction {
  GET_ALL_REQUEST = '@@lookup/holiday/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@lookup/holiday/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@lookup/holiday/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@lookup/holiday/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@lookup/holiday/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@lookup/holiday/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@lookup/holiday/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@lookup/holiday/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@lookup/holiday/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@lookup/holiday/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@lookup/holiday/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@lookup/holiday/GET_BY_ID_DISPOSE',
  POST_REQUEST = '@@lookup/holiday/POST_REQUEST',
  POST_SUCCESS = '@@lookup/holiday/POST_SUCCESS',
  POST_ERROR = '@@lookup/holiday/POST_ERROR',
  POST_DISPOSE = '@@lookup/holiday/POST_DISPOSE',
  PUT_REQUEST = '@@lookup/holiday/PUT_REQUEST',
  PUT_SUCCESS = '@@lookup/holiday/PUT_SUCCESS',
  PUT_ERROR = '@@lookup/holiday/PUT_ERROR',
  PUT_DISPOSE = '@@lookup/holiday/PUT_DISPOSE',
  DELETE_REQUEST = '@@lookup/holiday/DELETE_REQUEST',
  DELETE_SUCCESS = '@@lookup/holiday/DELETE_SUCCESS',
  DELETE_ERROR = '@@lookup/holiday/DELETE_ERROR',
  DELETE_DISPOSE = '@@lookup/holiday/DELETE_DISPOSE'
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

// delete
export const lookupHolidayDeleteRequest = (request: ILookupHolidayDeleteRequest) => action(LookupHolidayAction.DELETE_REQUEST, request);
export const lookupHolidayDeleteSuccess = (response: IResponseSingle<ILookupHoliday>) => action(LookupHolidayAction.DELETE_SUCCESS, response);
export const lookupHolidayDeleteError = (message: string) => action(LookupHolidayAction.DELETE_ERROR, message);
export const lookupHolidayDeleteDispose = () => action(LookupHolidayAction.DELETE_DISPOSE);