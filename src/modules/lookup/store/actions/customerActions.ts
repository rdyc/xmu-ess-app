import { IResponseCollection } from '@generic/interfaces';
import { ICustomerAllRequest, ICustomerByIdRequest, ICustomerListRequest } from '@lookup/classes/queries';
import { ICustomer, ICustomerDetail, ICustomerList } from '@lookup/classes/response';
import { action } from 'typesafe-actions';

export const enum CustomerAction {
  GET_ALL_REQUEST = '@@customer/GET_ALL_REQUEST',
  GET_ALL_SUCCESS = '@@customer/GET_ALL_SUCCESS',
  GET_ALL_ERROR = '@@customer/GET_ALL_ERROR',
  GET_ALL_DISPOSE = '@@customer/GET_ALL_DISPOSE',
  GET_LIST_REQUEST = '@@customer/GET_LIST_REQUEST',
  GET_LIST_SUCCESS = '@@customer/GET_LIST_SUCCESS',
  GET_LIST_ERROR = '@@customer/GET_LIST_ERROR',
  GET_LIST_DISPOSE = '@@customer/GET_LIST_DISPOSE',
  GET_BY_ID_REQUEST = '@@customer/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@@customer/GET_BY_ID_SUCCESS',
  GET_BY_ID_ERROR = '@@customer/GET_BY_ID_ERROR',
  GET_BY_ID_DISPOSE = '@@customer/GET_BY_ID_DISPOSE',
}

// get all
export const customerGetAllRequest = (request: ICustomerAllRequest) => action(CustomerAction.GET_ALL_REQUEST, request);
export const customerGetAllSuccess = (response: IResponseCollection<ICustomer>) => action(CustomerAction.GET_ALL_SUCCESS, response);
export const customerGetAllError = (message: string) => action(CustomerAction.GET_ALL_ERROR, message);
export const customerGetAllDispose = () => action(CustomerAction.GET_ALL_DISPOSE);

// get list
export const customerGetListRequest = (request: ICustomerListRequest) => action(CustomerAction.GET_LIST_REQUEST, request);
export const customerGetListSuccess = (response: IResponseCollection<ICustomerList>) => action(CustomerAction.GET_LIST_SUCCESS, response);
export const customerGetListError = (message: string) => action(CustomerAction.GET_LIST_ERROR, message);
export const customerGetListDispose = () => action(CustomerAction.GET_LIST_DISPOSE);

// get by id
export const customerGetByIdRequest = (request: ICustomerByIdRequest) => action(CustomerAction.GET_BY_ID_REQUEST, request);
export const customerGetByIdSuccess = (response: IResponseCollection<ICustomerDetail>) => action(CustomerAction.GET_BY_ID_SUCCESS, response);
export const customerGetByIdError = (message: string) => action(CustomerAction.GET_BY_ID_ERROR, message);
export const customerGetByIdDispose = () => action(CustomerAction.GET_BY_ID_DISPOSE);