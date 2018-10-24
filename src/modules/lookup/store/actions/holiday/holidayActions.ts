import { IResponseCollection } from '@generic/interfaces';
import { IHolidayAllRequest, IHolidayByIdRequest, IHolidayListRequest } from '@lookup/classes/queries';
import { IHoliday, IHolidayDetail, IHolidayList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum HolidayAction {
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
}

// get all
export const holidayGetAllRequest = (request: IHolidayAllRequest) => action(HolidayAction.GET_ALL_REQUEST, request);
export const holidayGetAllSuccess = (response: IResponseCollection<IHoliday>) => action(HolidayAction.GET_ALL_SUCCESS, response);
export const holidayGetAllError = (message: string) => action(HolidayAction.GET_ALL_ERROR, message);
export const holidayGetAllDispose = () => action(HolidayAction.GET_ALL_DISPOSE);

// get list
export const holidayGetListRequest = (request: IHolidayListRequest) => action(HolidayAction.GET_LIST_REQUEST, request);
export const holidayGetListSuccess = (response: IResponseCollection<IHolidayList>) => action(HolidayAction.GET_LIST_SUCCESS, response);
export const holidayGetListError = (message: string) => action(HolidayAction.GET_LIST_ERROR, message);
export const holidayGetListDispose = () => action(HolidayAction.GET_LIST_DISPOSE);

// get by id
export const holidayGetByIdRequest = (request: IHolidayByIdRequest) => action(HolidayAction.GET_BY_ID_REQUEST, request);
export const holidayGetByIdSuccess = (response: IResponseCollection<IHolidayDetail>) => action(HolidayAction.GET_BY_ID_SUCCESS, response);
export const holidayGetByIdError = (message: string) => action(HolidayAction.GET_BY_ID_ERROR, message);
export const holidayGetByIdDispose = () => action(HolidayAction.GET_BY_ID_DISPOSE);