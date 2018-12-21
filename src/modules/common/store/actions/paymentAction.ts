import { ISystemAllRequest, ISystemByIdRequest, ISystemListRequest } from '@common/classes/queries';
import { ISystem, ISystemDetail, ISystemList } from '@common/classes/response';
import { IResponseCollection } from '@generic/interfaces';
import { action } from 'typesafe-actions';

export const enum PaymentAction {
  GET_ALL_REQUEST = '@@system/payment/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@system/payment/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@system/payment/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@system/payment/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@system/payment/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@system/payment/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@system/payment/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@system/payment/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@system/payment/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@system/payment/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@system/payment/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@system/payment/GET_BY_ID_DISPOSE',
}

// get all
export const paymentGetAllRequest = (request: ISystemAllRequest) => action(PaymentAction.GET_ALL_REQUEST, request);
export const paymentGetAllSuccess = (response: IResponseCollection<ISystem>) => action(PaymentAction.GET_ALL_SUCCESS, response);
export const paymentGetAllError = (message: string) => action(PaymentAction.GET_ALL_ERROR, message);
export const paymentGetAllDispose = () => action(PaymentAction.GET_ALL_DISPOSE);

// get list
export const paymentGetListRequest = (request: ISystemListRequest) => action(PaymentAction.GET_LIST_REQUEST, request);
export const paymentGetListSuccess = (response: IResponseCollection<ISystemList>) => action(PaymentAction.GET_LIST_SUCCESS, response);
export const paymentGetListError = (message: string) => action(PaymentAction.GET_LIST_ERROR, message);
export const paymentGetListDispose = () => action(PaymentAction.GET_LIST_DISPOSE);

// get by id
export const paymentGetByIdRequest = (request: ISystemByIdRequest) => action(PaymentAction.GET_BY_ID_REQUEST, request);
export const paymentGetByIdSuccess = (response: IResponseCollection<ISystemDetail>) => action(PaymentAction.GET_BY_ID_SUCCESS, response);
export const paymentGetByIdError = (message: string) => action(PaymentAction.GET_BY_ID_ERROR, message);
export const paymentGetByIdDispose = () => action(PaymentAction.GET_BY_ID_DISPOSE);